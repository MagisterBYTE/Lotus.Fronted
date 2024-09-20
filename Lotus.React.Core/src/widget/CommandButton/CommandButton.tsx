import { ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, SxProps, Theme, useTheme } from '@mui/material';
import { ICommand, NavigationCommand } from 'lotus-core';
import React from 'react';
import { Navigate } from 'react-router-dom';
import { Button, HorizontalStack, IButtonProps, Typography } from 'ui/components';
import { TCommandButtonType } from './CommandButtonType';

export interface ICommandButtonProps extends IButtonProps
{
  isVisibleLabel?: boolean;  

  buttonType: TCommandButtonType;

  onBeforeCommand?: () => void;

  command: ICommand;
}

export const CommandButton: React.FC<ICommandButtonProps> = (props:ICommandButtonProps) => 
{
  const {isVisibleLabel, buttonType, onBeforeCommand, command, ...propsButton  } = props;

  const theme = useTheme();
  
  const isSelected = command.isSelected();

  // eslint-disable-next-line consistent-return
  const handleClick = () => 
  {
    if(onBeforeCommand)
    {
      onBeforeCommand();
    }

    if(command)
    {
      if(command instanceof NavigationCommand)
      {
        if(command.route!.path !== '' && location.pathname !== command.route!.path)
        {
          return <Navigate to={command.route!.path} />
        }
      }
      else
      {
        command.execute();
      }
    }
  };

  const sxListItemSelected:SxProps<Theme> = 
  {
    '&.Mui-selected': 
    {
      borderLeftWidth: '4px',
      borderLeftStyle: 'solid',
      borderLeftColor: theme.palette.primary.main
    }
  };  

  switch(buttonType)
  {
    case TCommandButtonType.Icon:
    {
      if(isVisibleLabel && command.label !== '')
      {
        return (<Button variant='text' style={{margin: 4, width: '90%'}} {...propsButton} disabled={!command.canExecute()} onClick={handleClick}>
          <HorizontalStack gap='0.5rem' alignItems='center'>
            {command.icon}
            <Typography variant='medium'>{command.label}</Typography>  
          </HorizontalStack>
        </Button>)
      }
      else
      {
        return (<Button {...propsButton} style={{margin: 4}} variant='text' disabled={!command.canExecute()} onClick={handleClick}>
          {command.icon}
        </Button>)
      }
    }
    case TCommandButtonType.ListItem:
    {
      return <ListItem  disablePadding>
        <ListItemButton disabled={!command.canExecute()} onClick={handleClick}
          selected={isSelected}
          sx={sxListItemSelected}>
          <ListItemIcon>
            {command.icon}
          </ListItemIcon>
          {isVisibleLabel && command.label !== '' && <ListItemText primary={command.label} /> }
        </ListItemButton>
      </ListItem>
    }
    case TCommandButtonType.MenuItem:
    {
      return <MenuItem disabled={!command.canExecute()}  onClick={handleClick}>
        <Button {...propsButton}>
          {command.icon}
        </Button>
        {command.label}
      </MenuItem> 
    }
  } 
  return <></>
};