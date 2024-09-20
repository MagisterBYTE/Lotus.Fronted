import type { Meta, StoryObj } from '@storybook/react';
import { VerticalStack } from 'ui/components/Layout';
import { Typography } from 'ui/components/Display';
import { ListView } from './ListView';
import { PersonApi } from '.storydata/PersonApi';
import { IPerson, PersonInfoBase } from '.storydata/PersonInfo';

const meta = {
  title: 'DataView/ListView',
  component: ListView,
  parameters: {
    layout: 'centered'
  },

  tags: ['autodocs'],

  argTypes: {
  }
} satisfies Meta<typeof ListView>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    objectInfo: PersonInfoBase.Instance,
    onGetItems: PersonApi.getPersonsAsync,
    renderList: (list)=>
    {
      const persons:IPerson[] = list as IPerson[];
      return (<>
        {
          persons.map((person, index)=>
          {
            return (<VerticalStack style={{ minWidth: 280, margin: 2 }}>
              <Typography key={index} variant='large' >
                {person.name}
              </Typography>
              <Typography key={index} variant='large' >
                {person.surname}
              </Typography>
            </VerticalStack>)
          })
        }
      </>)
    }
  }
}