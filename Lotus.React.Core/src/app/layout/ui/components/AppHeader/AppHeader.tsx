import React, { ComponentPropsWithRef, useRef } from 'react';
import { openLeftPanelLayoutAction, showHeaderUserLayoutAction, useLayoutState } from 'app/layout/store';
import { useAppDispatchCore } from 'app/store';
import './AppHeader.css';
import { useLayoutHeaderState } from 'app/layout/store/LayoutSelector';
import { Button, TButtonVariant } from 'ui/components/Controls';
import { FiMenu } from 'react-icons/fi';
import { TControlSize } from 'ui/types';
import { BsPersonCircle } from 'react-icons/bs';
import { Dialog } from 'ui/components/Feedback';
import { IDialogComponent } from 'ui/components/Feedback/Dialog/Dialog';
import { HorizontalStack, TTypographyVariant, Typography, VerticalStack } from 'ui/components';
import { Switch } from '@mui/material';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IAppHeaderProps extends ComponentPropsWithRef<'header'> 
{

}

export const AppHeader: React.FC<IAppHeaderProps> = (props: IAppHeaderProps) => 
{
  const refDialog = useRef<IDialogComponent>(null);
  const headerState = useLayoutHeaderState();
  const dispatch = useAppDispatchCore();

   
  const toggleDrawer = () => 
  {
    // const status = !layoutState.leftPanel.isOpen;
    // dispatch(openLeftPanelLayoutAction(status));
  };

  const handleOpenSettings = () => 
  {
    refDialog.current?.showModal();
  };

  const handleVisibleHeader = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => 
  {
    dispatch(showHeaderUserLayoutAction(checked));
  };

  return <>{headerState.isVisibleUser && headerState.isVisible &&
    <header {...props} className='lotus-app-header'>
      <Button style={{flexGrow: '0', margin: '1rem'}} variant={'outline'} size={'large'} onClick={toggleDrawer}>
        <FiMenu />
      </Button>
      <div style={{flexGrow: '1'}}>{props.children}</div>
      <Button style={{flexGrow: '0', margin: '1rem'}} variant={'outline'} size={'large'} onClick={handleOpenSettings}>
        <BsPersonCircle />
      </Button>
    </header>}
  <Dialog ref={refDialog}>
    <VerticalStack>
      <Typography variant={'h5'}>
            Настройки макета сайта
      </Typography>
      <Typography variant={'h6'}>
            Заголовок
      </Typography>
      <HorizontalStack fullWidth>
        <Typography style={{flexGrow: '1'}} variant={'medium'}>
            Показать
        </Typography>
        <Switch onChange={handleVisibleHeader}/>
      </HorizontalStack>
      <HorizontalStack fullWidth>
        <Typography style={{flexGrow: '1'}} variant={'medium'}>
            Прилипать к верху
        </Typography>
        <Switch onChange={handleVisibleHeader}/>
      </HorizontalStack>
    </VerticalStack>
  </Dialog>
  </>
};

