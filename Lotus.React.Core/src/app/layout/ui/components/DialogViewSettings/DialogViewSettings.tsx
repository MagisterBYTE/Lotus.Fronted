import { Switch } from '@mui/material';
import { showHeaderUserLayoutAction } from 'app/layout/store';
import { useLayoutHeaderState } from 'app/layout/store/LayoutSelector';
import { useAppDispatchCore } from 'app/store';
import { useEffect, useRef } from 'react';
import { VerticalStack, HorizontalStack, Typography } from 'ui/components';
import { Dialog, IDialogComponent } from 'ui/components/Feedback';

export interface IDialogViewSettingsProps
{
  isOpen: boolean;
}

export const DialogViewSettings: React.FC<IDialogViewSettingsProps> = (props:IDialogViewSettingsProps) => 
{
  const refDialog = useRef<IDialogComponent>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const headerState = useLayoutHeaderState();
  const dispatch = useAppDispatchCore();
  
  useEffect(() =>
  {
    if(props.isOpen)
    {
      refDialog.current?.showModal();
    }
    else
    {
      refDialog.current?.close();
    }
  }, [props.isOpen])
  
  const handleVisibleHeader = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => 
  {
    dispatch(showHeaderUserLayoutAction(checked));
  };
  
  return <Dialog ref={refDialog}>
    <VerticalStack>
      <Typography variant='h5'>
              Настройки макета сайта
      </Typography>
      <Typography variant='h6'>
              Заголовок
      </Typography>
      <HorizontalStack fullWidth>
        <Typography style={{flexGrow: '1'}} variant='medium'>
              Показать
        </Typography>
        <Switch onChange={handleVisibleHeader}/>
      </HorizontalStack>
      <HorizontalStack fullWidth>
        <Typography style={{flexGrow: '1'}} variant='medium'>
              Прилипать к верху
        </Typography>
        <Switch onChange={handleVisibleHeader}/>
      </HorizontalStack>
    </VerticalStack>
  </Dialog>
};