import { reactRouterParameters, withRouter } from "storybook-addon-remix-react-router";
import type { Meta, StoryObj } from '@storybook/react';

import Navbar from '../components/Navbar';

const meta = {
    title: 'Example/Navbar',
    component: Navbar,
    decorators: [withRouter],
    tags: ['autodocs'],
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Home: Story = {
    parameters: {
        reactRouter: reactRouterParameters({
            location: {
                path: '/',
            },
            routing: {
                path: '/',
            }
        })
    }
}

export const Backend: Story = {
    parameters: {
        reactRouter: reactRouterParameters({
            location: {
                path: '/backend',
            },
            routing: {
                path: '/backend',
            }
        })
    }
}

export const Release: Story = {
    parameters: {
        reactRouter: reactRouterParameters({
            location: {
                path: '/release',
            },
            routing: {
                path: '/release',
            }
        })
    }
}