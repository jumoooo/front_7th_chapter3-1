import type { Meta, StoryObj } from '@storybook/react';
import { Alert, AlertTitle, AlertDescription } from './alert';
import { AlertCircle, Info } from 'lucide-react';

const meta = {
  title: 'UI/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive'],
      description: 'Alert의 스타일 variant',
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 Alert입니다.
 */
export const Default: Story = {
  render: () => (
    <Alert className="w-[400px]">
      <Info className="h-4 w-4" />
      <AlertTitle>알림</AlertTitle>
      <AlertDescription>
        이것은 기본 알림 메시지입니다.
      </AlertDescription>
    </Alert>
  ),
};

/**
 * Destructive 스타일의 Alert입니다. 에러나 경고 메시지에 사용합니다.
 */
export const Destructive: Story = {
  render: () => (
    <Alert variant="destructive" className="w-[400px]">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>오류</AlertTitle>
      <AlertDescription>
        문제가 발생했습니다. 다시 시도해주세요.
      </AlertDescription>
    </Alert>
  ),
};

/**
 * Title만 있는 Alert입니다.
 */
export const TitleOnly: Story = {
  render: () => (
    <Alert className="w-[400px]">
      <Info className="h-4 w-4" />
      <AlertTitle>중요한 알림</AlertTitle>
    </Alert>
  ),
};

/**
 * Description만 있는 Alert입니다.
 */
export const DescriptionOnly: Story = {
  render: () => (
    <Alert className="w-[400px]">
      <Info className="h-4 w-4" />
      <AlertDescription>
        간단한 알림 메시지입니다.
      </AlertDescription>
    </Alert>
  ),
};

/**
 * 여러 Alert를 한 번에 보여줍니다.
 */
export const Multiple: Story = {
  render: () => (
    <div className="space-y-4 w-[400px]">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>정보</AlertTitle>
        <AlertDescription>
          이것은 정보 알림입니다.
        </AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>경고</AlertTitle>
        <AlertDescription>
          이것은 경고 알림입니다.
        </AlertDescription>
      </Alert>
    </div>
  ),
};

