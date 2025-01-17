import { Divider, Drawer } from '@mui/material';
import { TScreenType } from 'app/layout/domain';
import { openLeftPanelLayoutAction, useLayoutState } from 'app/layout/store';
import { CommandService, DelimiterCommand } from 'lotus-core';
import React, { ComponentPropsWithRef, useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { Button } from 'ui/components/Controls';
import { CommandButton, TCommandButtonType } from 'widget';
import { useAppDispatchCore } from 'app/store';
import './AppLeftPanel.css';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IAppLeftPanelProps extends ComponentPropsWithRef<'nav'> 
{

}

export const AppLeftPanel: React.FC<IAppLeftPanelProps> = (props: IAppLeftPanelProps) => 
{
  const layoutState = useLayoutState();
  const dispatch = useAppDispatchCore();
   
  const [isOpen, setOpen] = useState(false);

  const toggleDrawer = () => 
  {
    // const status = !layoutState.leftPanel.isOpen;
    console.log('status', status);
    dispatch(openLeftPanelLayoutAction(!isOpen));
    // if(!isOpen)
    // {
    //   refVerticalStack.current!.style.width = `${layoutState.leftPanel.maxWidth}px`;
    // }
    // else
    // {
    //   refVerticalStack.current!.style.width = `${layoutState.leftPanel.minWidth}px`;
    // }
    setOpen(!isOpen);
  };

  const handleBeforeNavigation = () =>
  {
    setOpen(false);
    dispatch(openLeftPanelLayoutAction(false));
    // refVerticalStack.current!.style.width = `${layoutState.leftPanel.minWidth}px`;
  }

  if (props.children)
  {
    return <nav {...props} >
      {props.children}
    </nav>
  }

  const commands = CommandService.getCommandsByName(layoutState.leftPanelCommands);

  switch (layoutState.screenType)
  {
    case TScreenType.Desktop:
      {
        if(layoutState.header.isVisible == false || layoutState.header.isVisibleUser == false)
        {
          console.log('layoutState', layoutState);
          return (
            <>
              <Button size='large' style={{position: 'fixed', left: '20px', top: '0px'}} variant='filled' onClick={toggleDrawer}>
                <FiMenu />
              </Button>

              <Drawer open={isOpen} onClose={() =>{toggleDrawer()}}>
                {commands.map((command, index) => 
                {
                  if (command instanceof DelimiterCommand)
                  {
                    return <Divider key={index} />
                  }
                  else
                  {
                    return <CommandButton key={index}
                      isVisibleLabel
                      buttonType={TCommandButtonType.Icon}
                      command={command}
                      onBeforeCommand={handleBeforeNavigation} />; 
                  }
                })}
              </Drawer>
            </>
          )
        }
      }break;
    case TScreenType.Portrait:
    case TScreenType.Landscape:
    {
      const classNameDiv = isOpen ? 'app-left-panel__active' : 'app-left-panel';
      return (
        <div
          className={classNameDiv}
        >
          <Button variant='text' onClick={toggleDrawer}>
            <FiMenu />
          </Button>
          {isOpen === false && commands.map((command, index) => 
          {
            if (command instanceof DelimiterCommand)
            {
              return <Divider key={index} />
            }
            else
            {
              // return <CommandButton key={index}
              //   buttonType={TCommandButtonType.Icon}
              //   command={command}
              //   onBeforeCommand={handleBeforeNavigation} />;
              return <></>
            }
          })}

          {isOpen && commands.map((command, index) => 
          {
            if (command instanceof DelimiterCommand)
            {
              return <Divider key={index} />
            }
            else
            {
              return <></>
              // return <CommandButton key={index}
              //   isVisibleLabel
              //   buttonType={TCommandButtonType.Icon}
              //   command={command}
              //   onBeforeCommand={handleBeforeNavigation} />;
            }
          })}
        </div>
      )
    }
  }

  return <></>
};