import type { Meta, StoryObj } from '@storybook/react';
import { BaseCommand, CommandService, CommandServiceClass, ICommand } from 'lotus-core';
import { useAppDispatchCore } from 'app/store';
import { useEffect } from 'react';
import { IoPersonSharp, IoSettingsOutline } from 'react-icons/io5';
import { AiOutlineProfile } from 'react-icons/ai';
import { SiCondaforge } from 'react-icons/si';
import { setCommandsLeftPanelLayoutAction } from '../store';
import { AppMainLayout } from './AppMainLayout';
import { BigText } from '../../../.storydata/BigText';
import { SmallText } from '../../../.storydata/SmallText';

const meta = {
  title: 'App Template/AppMainLayout',
  component: AppMainLayout,
  parameters: {
    layout: 'fullscreen'
  },

  tags: ['autodocs'],

  argTypes: {
  },

  decorators: [
    (Story) => 
    {
      return (
        <div style={{ width: '90%', marginLeft: '20px', marginRight: '20px', backgroundColor: 'lightBlue' }}>
          {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
          <Story />
        </div>)
    }
  ]
} satisfies Meta<typeof AppMainLayout>;


export default meta;

type Story = StoryObj<typeof meta>;

class ClassicalCommandsClass extends CommandServiceClass
{
  private static _ClassicalCommands: ClassicalCommandsClass;

  public static override get Instance(): ClassicalCommandsClass 
  {
    return (this._ClassicalCommands || (this._ClassicalCommands = new this()));
  }

  // #region СВОЙСТВА
  /**
   * Аккаунт
   */
  account: ICommand;

  /**
   * Профиль
   */
  profile: ICommand;

  /**
   * Настройки
   */
  settings: ICommand;

  /**
   * Уведомления
   */
  notification: ICommand;
  // #endregion 

  constructor() 
  {
    super();

    this.account = new BaseCommand('person');
    this.account.label = 'Персонаж';
    this.account.group = 'account';
    this.account.icon = <IoPersonSharp />;
    this.commands.push(this.account);

    this.profile = new BaseCommand('profile');
    this.profile.label = 'Профиль';
    this.profile.group = 'account';
    this.profile.icon = <AiOutlineProfile />
    this.commands.push(this.profile);

    this.settings = new BaseCommand('settings');
    this.settings.label = 'Настройки';
    this.settings.group = 'account';
    this.settings.icon = <IoSettingsOutline />;
    this.commands.push(this.settings);

    this.notification = new BaseCommand('forge');
    this.notification.label = 'Кузня';
    this.notification.group = 'account';
    this.notification.icon = <SiCondaforge />;
    this.commands.push(this.notification);

    CommandService.addCommands(this.commands);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AppMainLayoutWrapper = (args:any) => 
{
  const dispatch = useAppDispatchCore()
  const instance = ClassicalCommandsClass.Instance;
  
  useEffect(() => 
  {
    dispatch(setCommandsLeftPanelLayoutAction([...instance.getCommands().map(x => x.name)]));
  }, [])

  return (
    <AppMainLayout {...args}/>
  )
}

export const Classical: Story = {

  loaders: () =>
  {

  },
  args: {
    offsetTop: '20px',
    page: BigText()
  },
  render: (args) =>
  {
    return AppMainLayoutWrapper(args);
  }
};

export const MinimumText: Story = {

  loaders: () =>
  {

  },
  args: {
    offsetTop: '20px',
    page: SmallText()
  },
  render: (args) =>
  {
    return AppMainLayoutWrapper(args);
  }
};

