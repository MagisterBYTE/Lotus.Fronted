import { Divider } from '@mui/material';
import { TScreenType } from 'app/layout/domain';
import { openLeftPanelLayoutAction, useLayoutState } from 'app/layout/store';
import { useAppDispatchCore } from 'app/store';
import { CommandService, DelimiterCommand } from 'lotus-core';
import React, { ComponentPropsWithRef, useRef, useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { Button, TButtonVariant } from 'ui/components/Controls';
import { CommandButton, TCommandButtonType } from 'widget';
import './AppLeftPanel.css';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IAppLeftPanelProps extends ComponentPropsWithRef<'nav'> 
{

}

export const AppLeftPanel: React.FC<IAppLeftPanelProps> = (props: IAppLeftPanelProps) => 
{
  const layoutState = useLayoutState();
  // const dispatch = useAppDispatchCore();
   
  const refVerticalStack = useRef<HTMLDivElement>(null);
  const [isOpen, setOpen] = useState(false);

  const toggleDrawer = () => 
  {
    // const status = !layoutState.leftPanel.isOpen;
    console.log('status', status);
    // dispatch(openLeftPanelLayoutAction(status));
    if(!isOpen)
    {
      refVerticalStack.current!.style.width = `${layoutState.leftPanel.maxWidth}px`;
    }
    else
    {
      refVerticalStack.current!.style.width = `${layoutState.leftPanel.minWidth}px`;
    }
    setOpen(!isOpen);
  };

  const handleBeforeNavigation = () =>
  {
    // dispatch(openLeftPanelLayoutAction(false));
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
    case TScreenType.Portrait:
    case TScreenType.Landscape:
    {
      const classNameDiv = isOpen ? 'app-left-panel__active' : 'app-left-panel';
      return (
        <div
          className={classNameDiv}
          ref={refVerticalStack}
        >
          <Button variant={'text'} onClick={toggleDrawer}>
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