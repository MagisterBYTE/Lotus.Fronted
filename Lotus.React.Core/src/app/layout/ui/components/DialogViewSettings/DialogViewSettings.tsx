import { Switch } from '@mui/material';
import { showHeaderUserLayoutAction } from 'app/layout/store';
import { useLayoutHeaderState } from 'app/layout/store/LayoutSelector';
import { useAppDispatchCore } from 'app/store';
import { useEffect, useRef } from 'react';
import { VerticalStack, HorizontalStack, Typography, Select } from 'ui/components';
import { Dialog, IDialogComponent } from 'ui/components/Feedback';
import { ThemeColorOptions, ThemeModeOptions, TThemeColor, TThemeMode, useThemeSelector } from 'ui/theme';

export interface IDialogViewSettingsProps
{
  isOpen: boolean;

  onOk?: ()=>void;

  onClose?: ()=>void; 
}

export const DialogViewSettings: React.FC<IDialogViewSettingsProps> = (props:IDialogViewSettingsProps) => 
{
  const theme = useThemeSelector();
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

  const handleSetThemeColor = (selectedValue?:TThemeColor) =>
  {
    theme.setTheme({mode: theme.theme.mode, color: selectedValue!})
  }

  const handleSetThemeMode = (selectedValue?:TThemeMode) =>
  {
    theme.setTheme({mode: selectedValue!, color: theme.theme.color})
  }
  
  return <Dialog borderStyle='solid' colorVariant='white' 
    isMoveable
    onOk={props.onOk} onClose={props.onClose}
    style={{width: '400px', height:'600px'}} shadowElevation={4} ref={refDialog} header='Настройки макета сайта'  >
    <VerticalStack gap='0.5rem'>
      
      <Typography variant='h6' children='Тема и цвет сайта' />
      <Select<TThemeMode> options={ThemeModeOptions} onSetSelectedValue={handleSetThemeMode} labelProps={{label: 'Тема', labelWidth: '60%'}}  />
      <Select<TThemeColor> options={ThemeColorOptions} onSetSelectedValue={handleSetThemeColor} labelProps={{label: 'Основной цвет', labelWidth: '60%'}}  />
      
      <Typography variant='h6' children='Заголовок'/>
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