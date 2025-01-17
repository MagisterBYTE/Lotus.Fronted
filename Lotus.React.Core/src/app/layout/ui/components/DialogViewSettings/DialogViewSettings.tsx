import { Switch } from '@mui/material';
import { showHeaderUserLayoutAction } from 'app/layout/store';
import { useLayoutHeaderState } from 'app/layout/store/LayoutSelector';
import { useAppDispatchCore } from 'app/store';
import { IOption } from 'lotus-core';
import { useEffect, useRef } from 'react';
import { HorizontalStack, SelectOption, Typography, VerticalStack } from 'ui/components';
import { Dialog, IDialogComponent } from 'ui/components/Feedback';
import { ThemeColorOptions, ThemeModeOptions, TThemeColor, TThemeMode, useThemeSelector } from 'ui/theme';

export interface IDialogViewSettingsProps
{
  isOpen: boolean;

  onOk?: () => void;

  onClose?: () => void;
}

export const DialogViewSettings: React.FC<IDialogViewSettingsProps> = (props: IDialogViewSettingsProps) => 
{
  const theme = useThemeSelector();
  const refDialog = useRef<IDialogComponent>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const headerState = useLayoutHeaderState();
  const dispatch = useAppDispatchCore();

  useEffect(() =>
  {
    if (props.isOpen)
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

  const handleSetThemeColor = (selectedOption?: IOption) =>
  {
    theme.setTheme({ mode: theme.theme.mode, color: selectedOption!.value })
  }

  const handleSetThemeMode = (selectedOption?: IOption) =>
  {
    theme.setTheme({ mode: selectedOption!.value, color: theme.theme.color })
  }

  return <Dialog borderStyle='solid' colorVariant='white'
    isMoveable
    onOk={props.onOk} onClose={props.onClose}
    style={{ width: '400px', height: '600px' }} shadowElevation={4} ref={refDialog} header='Настройки макета сайта'  >
    <VerticalStack gap='0.5rem'>

      <Typography variant='h6' children='Тема и цвет сайта' />
      <SelectOption<TThemeMode> options={ThemeModeOptions} onSelectedOption={handleSetThemeMode} labelProps={{ label: 'Тема', labelWidth: '60%' }} />
      <SelectOption<TThemeColor> options={ThemeColorOptions} onSelectedOption={handleSetThemeColor} labelProps={{ label: 'Основной цвет', labelWidth: '60%' }} />

      <Typography variant='h6' children='Заголовок' />
      <HorizontalStack fullWidth>
        <Typography style={{ flexGrow: '1' }} variant='medium'>
          Показать
        </Typography>
        <Switch onChange={handleVisibleHeader} />
      </HorizontalStack>
      <HorizontalStack fullWidth>
        <Typography style={{ flexGrow: '1' }} variant='medium'>
          Прилипать к верху
        </Typography>
        <Switch onChange={handleVisibleHeader} />
      </HorizontalStack>
    </VerticalStack>
  </Dialog>
};