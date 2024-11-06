import type { Meta, StoryObj } from '@storybook/react';

import Footer from '../components/common/Footer.tsx';

const meta = {
    title: 'Example/Footer',
    component: Footer,
    // parameters: {
    //     layout: 'bottom',
    // },
    tags: ['autodocs'],
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {

};