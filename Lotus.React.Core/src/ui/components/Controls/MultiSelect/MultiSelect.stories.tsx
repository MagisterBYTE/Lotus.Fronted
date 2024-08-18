import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { TColorType, TControlPadding, TControlSize } from 'ui/types';
import { HorizontalStack } from 'ui/components/Layout';
import { FcAddressBook, FcCloth, FcFactoryBreakdown } from 'react-icons/fc';
import { TTypographyVariant } from 'ui/components/Display/Typography';
import { InputField } from '../InputField';
import { Button } from '../Button';
import { MultiSelect } from './MultiSelect';

const meta = {
  title: 'Controls/MultiSelect',
  component: MultiSelect,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  args: { onSetSelectedValues: fn() },
  argTypes: {
    color: {
      control: 'select',
      options: Object.values(TColorType)
    },
    size: {
      control: 'select',
      options: Object.values(TControlSize)
    },
    paddingControl: {
      control: 'radio',
      options: Object.values(TControlPadding)

    }
  }

} satisfies Meta<typeof MultiSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const IconsIcons: Story = {
  args: {
    options: [
      { text: 'Первый', value: 1, icon: <FcAddressBook /> },
      { text: 'Второй', value: 2, icon: <FcCloth /> },
      { text: 'Третий', value: 3, icon: <FcFactoryBreakdown /> }],
    isDisabled: true,
    width: '200px',
    hasIcons: true
  }
};

export const IconsBase: Story = {
  args: {
    options: [
      // eslint-disable-next-line max-len
      { text: 'Масс', value: 1, icon: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4wLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL1RSLzIwMDEvUkVDLVNWRy0yMDAxMDkwNC9EVEQvc3ZnMTAuZHRkIj4NCjwhLS0gQ3JlYXRvcjogQ29yZWxEUkFXIDIwMTkgKDY0LUJpdCkgLS0+DQo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjI1NnB4IiBoZWlnaHQ9IjI1NnB4IiB2ZXJzaW9uPSIxLjAiIHN0eWxlPSJzaGFwZS1yZW5kZXJpbmc6Z2VvbWV0cmljUHJlY2lzaW9uOyB0ZXh0LXJlbmRlcmluZzpnZW9tZXRyaWNQcmVjaXNpb247IGltYWdlLXJlbmRlcmluZzpvcHRpbWl6ZVF1YWxpdHk7IGZpbGwtcnVsZTpldmVub2RkOyBjbGlwLXJ1bGU6ZXZlbm9kZCINCnZpZXdCb3g9IjAgMCA1LjUzIDUuNTMiDQogeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPg0KIDxkZWZzPg0KICA8c3R5bGUgdHlwZT0idGV4dC9jc3MiPg0KICAgPCFbQ0RBVEFbDQogICAgLmZpbDIge2ZpbGw6bm9uZX0NCiAgICAuZmlsMCB7ZmlsbDp3aGl0ZX0NCiAgICAuZmlsMSB7ZmlsbDp1cmwoI2lkMCl9DQogICBdXT4NCiAgPC9zdHlsZT4NCiAgPGxpbmVhckdyYWRpZW50IGlkPSJpZDAiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4MT0iMi43NyIgeTE9IjUuNTEiIHgyPSIyLjc3IiB5Mj0iMC4wMSI+DQogICA8c3RvcCBvZmZzZXQ9IjAiIHN0eWxlPSJzdG9wLW9wYWNpdHk6MTsgc3RvcC1jb2xvcjojRUY3RjFBIi8+DQogICA8c3RvcCBvZmZzZXQ9IjAuNDkwMTk2IiBzdHlsZT0ic3RvcC1vcGFjaXR5OjE7IHN0b3AtY29sb3I6I0YwOTcxQyIvPg0KICAgPHN0b3Agb2Zmc2V0PSIxIiBzdHlsZT0ic3RvcC1vcGFjaXR5OjE7IHN0b3AtY29sb3I6I0ZCQkEwMCIvPg0KICA8L2xpbmVhckdyYWRpZW50Pg0KIDwvZGVmcz4NCiA8ZyBpZD0i0KHQu9C+0LlfeDAwMjBfMSI+DQogIDxtZXRhZGF0YSBpZD0iQ29yZWxDb3JwSURfMENvcmVsLUxheWVyIi8+DQogIDxnIGlkPSJfMjEwMDIwODUxNjQ4MCI+DQogICA8cGF0aCBjbGFzcz0iZmlsMCIgZD0iTTUuNDIgMi42MWwtMC41IC0wLjI2IC0wLjQxIC0wLjIyIDAuOTQgLTAuNWMwLjA4LC0wLjA0IDAuMDgsLTAuMTkgLTAuMDMsLTAuMjRsLTIuNTQgLTEuMzVjLTAuMDUsLTAuMDIgLTAuMTgsLTAuMDIgLTAuMjMsMGwtMi41NCAxLjM1Yy0wLjExLDAuMDUgLTAuMTEsMC4yIC0wLjAzLDAuMjRsMC45NCAwLjUgLTAuNCAwLjIxIC0wLjUxIDAuMjdjLTAuMTEsMC4wNiAtMC4xMSwwLjIgLTAuMDMsMC4yNWwwLjk4IDAuNTEgLTAuNDQgMC4yNCAwIDAgLTAuNTEgMC4yN2MtMC4xMSwwLjA1IC0wLjExLDAuMTkgLTAuMDMsMC4yNGwyLjU2IDEuMzZjMC4wNywwLjA0IDAuMTgsMC4wMyAwLjI1LDBsMi41NiAtMS4zNmMwLjA4LC0wLjA1IDAuMDgsLTAuMTkgLTAuMDMsLTAuMjRsLTAuNSAtMC4yNyAtMC40NSAtMC4yNCAwLjk4IC0wLjUxYzAuMDgsLTAuMDUgMC4wOCwtMC4xOSAtMC4wMywtMC4yNXoiLz4NCiAgIDxwYXRoIGNsYXNzPSJmaWwxIiBkPSJNMi42NiA1LjQ5bC0yLjU4IC0xLjM3Yy0wLjA4LC0wLjA1IC0wLjA4LC0wLjE5IDAuMDMsLTAuMjRsMC41MSAtMC4yNyAxLjkyIDAuOTljMC4xLDAuMDUgMC4zLDAuMTIgMC41MSwwbDEuODcgLTAuOTkgMC41IDAuMjdjMC4xMSwwLjA1IDAuMTEsMC4xOSAwLjAzLDAuMjRsLTIuNTggMS4zN2MtMC4wNiwwLjAzIC0wLjE1LDAuMDMgLTAuMjEsMHptMCAtMS4yN2wtMi41OCAtMS4zNmMtMC4wOCwtMC4wNSAtMC4wOCwtMC4xOSAwLjAzLC0wLjI1bDAuNTEgLTAuMjcgMS45MiAxYzAuMSwwLjA1IDAuMywwLjExIDAuNTEsMGwxLjg3IC0wLjk5IDAuNSAwLjI2YzAuMTEsMC4wNiAwLjExLDAuMiAwLjAzLDAuMjVsLTIuNTggMS4zNmMtMC4wNiwwLjA0IC0wLjE1LDAuMDQgLTAuMjEsMHptMCAtMS4yMmwtMi41OCAtMS4zN2MtMC4wOCwtMC4wNCAtMC4wOCwtMC4xOSAwLjAzLC0wLjI0bDIuNTYgLTEuMzZjMC4wNSwtMC4wMiAwLjE0LC0wLjAyIDAuMTksMGwyLjU2IDEuMzZjMC4xMSwwLjA1IDAuMTEsMC4yIDAuMDMsMC4yNGwtMi41OCAxLjM3Yy0wLjA2LDAuMDMgLTAuMTUsMC4wMyAtMC4yMSwweiIvPg0KICAgPHJlY3QgY2xhc3M9ImZpbDIiIHg9IjAuMDEiIHk9IjAuMDEiIHdpZHRoPSI1LjUiIGhlaWdodD0iNS41Ii8+DQogIDwvZz4NCiA8L2c+DQo8L3N2Zz4NCg==' },
      // eslint-disable-next-line max-len
      { text: 'Анал', value: 2, icon: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8IS0tIENyZWF0b3I6IENvcmVsRFJBVyAyMDE5ICg2NC1CaXQpIC0tPg0KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSIyNTZweCIgaGVpZ2h0PSIyNTZweCIgdmVyc2lvbj0iMS4xIiBzdHlsZT0ic2hhcGUtcmVuZGVyaW5nOmdlb21ldHJpY1ByZWNpc2lvbjsgdGV4dC1yZW5kZXJpbmc6Z2VvbWV0cmljUHJlY2lzaW9uOyBpbWFnZS1yZW5kZXJpbmc6b3B0aW1pemVRdWFsaXR5OyBmaWxsLXJ1bGU6ZXZlbm9kZDsgY2xpcC1ydWxlOmV2ZW5vZGQiDQp2aWV3Qm94PSIwIDAgNi43OSA2Ljc5Ig0KIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIg0KIHhtbG5zOnhvZG09Imh0dHA6Ly93d3cuY29yZWwuY29tL2NvcmVsZHJhdy9vZG0vMjAwMyI+DQogPGRlZnM+DQogIDxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+DQogICA8IVtDREFUQVsNCiAgICAuZmlsMyB7ZmlsbDpub25lfQ0KICAgIC5maWwwIHtmaWxsOiNGRUZFRkV9DQogICAgLmZpbDEge2ZpbGw6dXJsKCNpZDApfQ0KICAgIC5maWwyIHtmaWxsOnVybCgjaWQxKX0NCiAgIF1dPg0KICA8L3N0eWxlPg0KICA8bGluZWFyR3JhZGllbnQgaWQ9ImlkMCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHgxPSI1LjEzIiB5MT0iNC4wOCIgeDI9IjIuNSIgeTI9IjQuMDgiPg0KICAgPHN0b3Agb2Zmc2V0PSIwIiBzdHlsZT0ic3RvcC1vcGFjaXR5OjE7IHN0b3AtY29sb3I6I0JGMjcyRSIvPg0KICAgPHN0b3Agb2Zmc2V0PSIwLjQ5MDE5NiIgc3R5bGU9InN0b3Atb3BhY2l0eToxOyBzdG9wLWNvbG9yOiNENDNCM0YiLz4NCiAgIDxzdG9wIG9mZnNldD0iMSIgc3R5bGU9InN0b3Atb3BhY2l0eToxOyBzdG9wLWNvbG9yOiNFOTRGNTAiLz4NCiAgPC9saW5lYXJHcmFkaWVudD4NCiAgPGxpbmVhckdyYWRpZW50IGlkPSJpZDEiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4MT0iNi40OCIgeTE9IjIuMzUiIHgyPSIwLjMxIiB5Mj0iMi4zNSI+DQogICA8c3RvcCBvZmZzZXQ9IjAiIHN0eWxlPSJzdG9wLW9wYWNpdHk6MTsgc3RvcC1jb2xvcjojRUY3RjFBIi8+DQogICA8c3RvcCBvZmZzZXQ9IjAuNDkwMTk2IiBzdHlsZT0ic3RvcC1vcGFjaXR5OjE7IHN0b3AtY29sb3I6I0YwOTcxQyIvPg0KICAgPHN0b3Agb2Zmc2V0PSIxIiBzdHlsZT0ic3RvcC1vcGFjaXR5OjE7IHN0b3AtY29sb3I6I0ZCQkEwMCIvPg0KICA8L2xpbmVhckdyYWRpZW50Pg0KIDwvZGVmcz4NCiA8ZyBpZD0i0KHQu9C+0LlfeDAwMjBfMSI+DQogIDxtZXRhZGF0YSBpZD0iQ29yZWxDb3JwSURfMENvcmVsLUxheWVyIi8+DQogIDxnIGlkPSJfMTY2ODU3NTQ4NTMyOCI+DQogICA8Zz4NCiAgICA8cGF0aCBjbGFzcz0iZmlsMCIgZD0iTTUuMTMgMi45NWwwIC0xLjU5IC0wLjQ2IDAgMCAxLjU5IDAuNDYgMHptLTEuMDkgMGwwIC0xLjU5IC0wLjQ2IDAgMCAxLjU5IDAuNDYgMHptLTEuMDkgMGwwIC0xLjU5IC0wLjQ1IDAgMCAxLjU5IDAuNDUgMHptMi4xOCAzLjg0bDAgLTEuNTkgLTAuNDYgMCAwIDEuNTkgMC40NiAwem0tMS4wOSAwbDAgLTEuNTkgLTAuNDYgMCAwIDEuNTkgMC40NiAwem0tMS4wOSAwbDAgLTEuNTkgLTAuNDUgMCAwIDEuNTkgMC40NSAwem0zLjUzIC0zLjE2YzAsLTAuMDkgLTAuMDgsLTAuMTYgLTAuMTcsLTAuMTZsLTQuNTkgMGMtMC4wOSwwIC0wLjE3LC0wLjA4IC0wLjE3LC0wLjE3bDAgLTMuMTNjMCwtMC4xIC0wLjA3LC0wLjE3IC0wLjE2LC0wLjE3bC0wLjkxIDBjLTAuMDksMCAtMC4xNywwLjA3IC0wLjE3LDAuMTdsMCA0LjM3YzAsMC4wOSAwLjA4LDAuMTcgMC4xNywwLjE3bDUuODMgMGMwLjA5LDAgMC4xNywtMC4wOCAwLjE3LC0wLjE3bDAgLTAuOTF6Ii8+DQogICAgPGc+DQogICAgIDxwYXRoIGNsYXNzPSJmaWwxIiBkPSJNNS4xMyAyLjk1bDAgLTEuNTkgLTAuNDYgMCAwIDEuNTkgMC40NiAwem0tMS4wOSAwbDAgLTEuNTkgLTAuNDYgMCAwIDEuNTkgMC40NiAwem0tMS4wOCAwbDAgLTEuNTkgLTAuNDYgMCAwIDEuNTkgMC40NiAwem0yLjE3IDMuODRsMCAtMS41OSAtMC40NiAwIDAgMS41OSAwLjQ2IDB6bS0xLjA5IDBsMCAtMS41OSAtMC40NiAwIDAgMS41OSAwLjQ2IDB6bS0xLjA4IDBsMCAtMS41OSAtMC40NiAwIDAgMS41OSAwLjQ2IDB6Ii8+DQogICAgIDxwYXRoIGNsYXNzPSJmaWwyIiBkPSJNNi40OCAzLjYzYzAsLTAuMDkgLTAuMDgsLTAuMTYgLTAuMTcsLTAuMTZsLTQuNTkgMGMtMC4wOSwwIC0wLjE3LC0wLjA4IC0wLjE3LC0wLjE3bDAgLTMuMTNjMCwtMC4xIC0wLjA3LC0wLjE3IC0wLjE2LC0wLjE3bC0wLjkxIDBjLTAuMDksMCAtMC4xNywwLjA3IC0wLjE3LDAuMTdsMCA0LjM3YzAsMC4wOSAwLjA4LDAuMTcgMC4xNywwLjE3bDUuODMgMGMwLjA5LDAgMC4xNywtMC4wOCAwLjE3LC0wLjE3bDAgLTAuOTF6Ii8+DQogICAgPC9nPg0KICAgPC9nPg0KICAgPHJlY3QgY2xhc3M9ImZpbDMiIHdpZHRoPSI2Ljc5IiBoZWlnaHQ9IjYuNzkiLz4NCiAgPC9nPg0KIDwvZz4NCjwvc3ZnPg0K' },
      // eslint-disable-next-line max-len
      { text: 'Обру', value: 3, icon: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8IS0tIENyZWF0b3I6IENvcmVsRFJBVyAyMDE5ICg2NC1CaXQpIC0tPg0KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSIyNTZweCIgaGVpZ2h0PSIyNTZweCIgdmVyc2lvbj0iMS4xIiBzdHlsZT0ic2hhcGUtcmVuZGVyaW5nOmdlb21ldHJpY1ByZWNpc2lvbjsgdGV4dC1yZW5kZXJpbmc6Z2VvbWV0cmljUHJlY2lzaW9uOyBpbWFnZS1yZW5kZXJpbmc6b3B0aW1pemVRdWFsaXR5OyBmaWxsLXJ1bGU6ZXZlbm9kZDsgY2xpcC1ydWxlOmV2ZW5vZGQiDQp2aWV3Qm94PSIwIDAgNy44NiA3Ljg2Ig0KIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIg0KIHhtbG5zOnhvZG09Imh0dHA6Ly93d3cuY29yZWwuY29tL2NvcmVsZHJhdy9vZG0vMjAwMyI+DQogPGRlZnM+DQogIDxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+DQogICA8IVtDREFUQVsNCiAgICAuZmlsOCB7ZmlsbDpub25lfQ0KICAgIC5maWwwIHtmaWxsOiNGRUZFRkV9DQogICAgLmZpbDYge2ZpbGw6dXJsKCNpZDApfQ0KICAgIC5maWw0IHtmaWxsOnVybCgjaWQxKX0NCiAgICAuZmlsNSB7ZmlsbDp1cmwoI2lkMil9DQogICAgLmZpbDMge2ZpbGw6dXJsKCNpZDMpfQ0KICAgIC5maWwyIHtmaWxsOnVybCgjaWQ0KX0NCiAgICAuZmlsMSB7ZmlsbDp1cmwoI2lkNSl9DQogICAgLmZpbDcge2ZpbGw6dXJsKCNpZDYpfQ0KICAgXV0+DQogIDwvc3R5bGU+DQogIDxsaW5lYXJHcmFkaWVudCBpZD0iaWQwIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjYuMTUiIHkxPSI3LjA1IiB4Mj0iNC41MyIgeTI9IjcuMDUiPg0KICAgPHN0b3Agb2Zmc2V0PSIwIiBzdHlsZT0ic3RvcC1vcGFjaXR5OjE7IHN0b3AtY29sb3I6I0JGMjcyRSIvPg0KICAgPHN0b3Agb2Zmc2V0PSIwLjQ5MDE5NiIgc3R5bGU9InN0b3Atb3BhY2l0eToxOyBzdG9wLWNvbG9yOiNENDNCM0YiLz4NCiAgIDxzdG9wIG9mZnNldD0iMSIgc3R5bGU9InN0b3Atb3BhY2l0eToxOyBzdG9wLWNvbG9yOiNFOTRGNTAiLz4NCiAgPC9saW5lYXJHcmFkaWVudD4NCiAgPGxpbmVhckdyYWRpZW50IGlkPSJpZDEiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4bGluazpocmVmPSIjaWQwIiB4MT0iNy44NiIgeTE9IjUuMzQiIHgyPSI2LjI1IiB5Mj0iNS4zNCI+DQogIDwvbGluZWFyR3JhZGllbnQ+DQogIDxsaW5lYXJHcmFkaWVudCBpZD0iaWQyIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeGxpbms6aHJlZj0iI2lkMCIgeDE9IjcuNDkiIHkxPSI2LjY4IiB4Mj0iNS44NyIgeTI9IjYuNjgiPg0KICA8L2xpbmVhckdyYWRpZW50Pg0KICA8bGluZWFyR3JhZGllbnQgaWQ9ImlkMyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHhsaW5rOmhyZWY9IiNpZDAiIHgxPSIxLjYyIiB5MT0iMi41MiIgeDI9IjAiIHkyPSIyLjUyIj4NCiAgPC9saW5lYXJHcmFkaWVudD4NCiAgPGxpbmVhckdyYWRpZW50IGlkPSJpZDQiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4bGluazpocmVmPSIjaWQwIiB4MT0iMS45OSIgeTE9IjEuMTgiIHgyPSIwLjM3IiB5Mj0iMS4xOCI+DQogIDwvbGluZWFyR3JhZGllbnQ+DQogIDxsaW5lYXJHcmFkaWVudCBpZD0iaWQ1IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeGxpbms6aHJlZj0iI2lkMCIgeDE9IjMuMzMiIHkxPSIwLjgxIiB4Mj0iMS43MiIgeTI9IjAuODEiPg0KICA8L2xpbmVhckdyYWRpZW50Pg0KICA8bGluZWFyR3JhZGllbnQgaWQ9ImlkNiIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHgxPSI3LjQxIiB5MT0iMy45MyIgeDI9IjAuNDUiIHkyPSIzLjkzIj4NCiAgIDxzdG9wIG9mZnNldD0iMCIgc3R5bGU9InN0b3Atb3BhY2l0eToxOyBzdG9wLWNvbG9yOiNGQkJBMDAiLz4NCiAgIDxzdG9wIG9mZnNldD0iMSIgc3R5bGU9InN0b3Atb3BhY2l0eToxOyBzdG9wLWNvbG9yOiNGRkVEMDAiLz4NCiAgPC9saW5lYXJHcmFkaWVudD4NCiA8L2RlZnM+DQogPGcgaWQ9ItCh0LvQvtC5X3gwMDIwXzEiPg0KICA8bWV0YWRhdGEgaWQ9IkNvcmVsQ29ycElEXzBDb3JlbC1MYXllciIvPg0KICA8ZyBpZD0iXzE2MzIyNTkyMjAxMTIiPg0KICAgPGc+DQogICAgPHBhdGggY2xhc3M9ImZpbDAiIGQ9Ik0zLjkzIDAuNDVjMS45MiwwIDMuNDgsMS41NiAzLjQ4LDMuNDggMCwwLjQyIC0wLjA3LDAuODIgLTAuMjEsMS4xOWwwLjY2IDAuNjcgLTAuMzYgMC4zNiAtMC41MyAtMC41M2MtMC4xMSwwLjIxIC0wLjI1LDAuNCAtMC40MSwwLjU4bDAuOTMgMC45MyAtMC4zNiAwLjM2IC0wLjkzIC0wLjkzYy0wLjE4LDAuMTYgLTAuMzcsMC4zIC0wLjU4LDAuNDFsMC41MyAwLjUzIC0wLjM2IDAuMzYgLTAuNjcgLTAuNjZjLTAuMzcsMC4xNCAtMC43NywwLjIxIC0xLjE5LDAuMjEgLTEuOTIsMCAtMy40OCwtMS41NiAtMy40OCwtMy40OCAwLC0wLjQyIDAuMDgsLTAuODIgMC4yMSwtMS4xOWwtMC42NiAtMC42NiAwLjM2IC0wLjM2IDAuNTMgMC41MmMwLjEyLC0wLjIgMC4yNSwtMC40IDAuNDEsLTAuNThsLTAuOTMgLTAuOTMgMC4zNiAtMC4zNiAwLjkzIDAuOTNjMC4xOCwtMC4xNiAwLjM4LC0wLjI5IDAuNTgsLTAuNDFsLTAuNTIgLTAuNTMgMC4zNiAtMC4zNiAwLjY2IDAuNjZjMC4zNywtMC4xMyAwLjc3LC0wLjIxIDEuMTksLTAuMjF6Ii8+DQogICAgPGc+DQogICAgIDxwb2x5Z29uIGNsYXNzPSJmaWwxIiBwb2ludHM9IjIuMDgsMCAzLjMzLDEuMjYgMi45NywxLjYyIDEuNzIsMC4zNiAiLz4NCiAgICAgPHBvbHlnb24gY2xhc3M9ImZpbDIiIHBvaW50cz0iMC43MywwLjM3IDEuOTksMS42MyAxLjYzLDEuOTkgMC4zNywwLjczICIvPg0KICAgICA8cG9seWdvbiBjbGFzcz0iZmlsMyIgcG9pbnRzPSIwLjM2LDEuNzIgMS42MiwyLjk3IDEuMjYsMy4zMyAwLDIuMDggIi8+DQogICAgIDxwb2x5Z29uIGNsYXNzPSJmaWw0IiBwb2ludHM9IjcuODYsNS43OSA2LjYxLDQuNTMgNi4yNSw0Ljg5IDcuNSw2LjE1ICIvPg0KICAgICA8cG9seWdvbiBjbGFzcz0iZmlsNSIgcG9pbnRzPSI3LjQ5LDcuMTMgNi4yNCw1Ljg3IDUuODcsNi4yNCA3LjEzLDcuNDkgIi8+DQogICAgIDxwb2x5Z29uIGNsYXNzPSJmaWw2IiBwb2ludHM9IjYuMTUsNy41IDQuODksNi4yNSA0LjUzLDYuNjEgNS43OSw3Ljg2ICIvPg0KICAgICA8cGF0aCBjbGFzcz0iZmlsNyIgZD0iTTMuMTMgMC41NWMxLjEzLC0wLjI3IDIuMzgsMC4wNCAzLjI2LDAuOTIgMC44OSwwLjg5IDEuMTksMi4xMyAwLjkzLDMuMjdsLTAuODQgLTAuODQgLTAuODcgMC44NiAwLjUgMC41IC0wLjg1IDAuODUgLTAuNSAtMC41IC0wLjg2IDAuODcgMC44NCAwLjg0Yy0xLjE0LDAuMjYgLTIuMzgsLTAuMDQgLTMuMjcsLTAuOTMgLTAuODgsLTAuODggLTEuMTksLTIuMTMgLTAuOTIsLTMuMjZsMC44NCAwLjg0IDAuODYgLTAuODcgLTAuNSAtMC41IDAuODUgLTAuODUgMC41IDAuNSAwLjg3IC0wLjg2IC0wLjg0IC0wLjg0em0wLjI2IDIuODRjMC4zLC0wLjMgMC43OSwtMC4zIDEuMDksMCAwLjMsMC4zIDAuMywwLjc5IDAsMS4wOSAtMC4zLDAuMyAtMC43OSwwLjMgLTEuMDksMCAtMC4zLC0wLjMgLTAuMywtMC43OSAwLC0xLjA5eiIvPg0KICAgIDwvZz4NCiAgIDwvZz4NCiAgIDxyZWN0IGNsYXNzPSJmaWw4IiB3aWR0aD0iNy44NiIgaGVpZ2h0PSI3Ljg2Ii8+DQogIDwvZz4NCiA8L2c+DQo8L3N2Zz4NCg==' }],
    hasIcons: true,
    width: '300px',
    isSearchable: false
  }
};

export const LabelLeft: Story = {
  args: {
    labelProps: { label: 'Фамилия', variant: TTypographyVariant.TitleMedium, isTopLabel: false },
    options: [{ text: 'Первый', value: 1 }, { text: 'Второй', value: 2 }, { text: 'Третий', value: 3 }]
  }
};

export const LabelTop: Story = {
  args: {
    labelProps: { label: 'Фамилия', variant: TTypographyVariant.TitleMedium, isTopLabel: true, style: { marginLeft: '0.4rem' } },
    options: [{ text: 'Первый', value: 1 }, { text: 'Второй', value: 2 }, { text: 'Третий', value: 3 }]
  }
};



export const HorizontalSpace: Story = {
  args: {
    color: TColorType.Accent,
    options: [{ text: 'Первый', value: 1 }, { text: 'Второй', value: 2 }, { text: 'Третий', value: 3 }]
  },
  render: (args) =>
  {
    return (
      <HorizontalStack alignItems='end' gap='0.5rem' fullWidth={true}>
        <MultiSelect options={args.options} color={args.color} size={args.size} paddingControl={args.paddingControl} width='200px' />
        <InputField labelProps={{ label: 'Введите фамилию', isTopLabel: false }} size={args.size} color={args.color}
          paddingControl={args.paddingControl} />
        <Button children='Отправить' size={args.size} color={args.color} paddingControl={args.paddingControl} />
      </HorizontalStack>
    );
  }
};
