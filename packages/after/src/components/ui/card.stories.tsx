import type { Meta, StoryObj } from '@storybook/react';
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from './card';
import { Button } from './button';

const meta = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 카드입니다.
 */
export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>카드 내용이 여기에 표시됩니다.</p>
      </CardContent>
    </Card>
  ),
};

/**
 * Footer가 있는 카드입니다.
 */
export const WithFooter: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>카드 내용이 여기에 표시됩니다.</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Save</Button>
      </CardFooter>
    </Card>
  ),
};

/**
 * Header만 있는 카드입니다.
 */
export const HeaderOnly: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
    </Card>
  ),
};

/**
 * Content만 있는 카드입니다.
 */
export const ContentOnly: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardContent className="pt-6">
        <p>카드 내용만 있는 간단한 카드입니다.</p>
      </CardContent>
    </Card>
  ),
};

/**
 * 여러 카드를 한 번에 보여줍니다.
 */
export const Multiple: Story = {
  render: () => (
    <div className="flex gap-4">
      <Card className="w-[250px]">
        <CardHeader>
          <CardTitle>Card 1</CardTitle>
          <CardDescription>첫 번째 카드</CardDescription>
        </CardHeader>
        <CardContent>
          <p>카드 내용 1</p>
        </CardContent>
      </Card>
      <Card className="w-[250px]">
        <CardHeader>
          <CardTitle>Card 2</CardTitle>
          <CardDescription>두 번째 카드</CardDescription>
        </CardHeader>
        <CardContent>
          <p>카드 내용 2</p>
        </CardContent>
      </Card>
      <Card className="w-[250px]">
        <CardHeader>
          <CardTitle>Card 3</CardTitle>
          <CardDescription>세 번째 카드</CardDescription>
        </CardHeader>
        <CardContent>
          <p>카드 내용 3</p>
        </CardContent>
      </Card>
    </div>
  ),
};

