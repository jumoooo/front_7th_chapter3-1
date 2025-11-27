import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './input';
import { Label } from './label';

const meta = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
      description: '입력 필드 타입',
    },
    placeholder: {
      control: 'text',
      description: '플레이스홀더 텍스트',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태',
    },
    value: {
      control: 'text',
      description: '입력 값',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 입력 필드입니다.
 */
export const Default: Story = {
  args: {
    placeholder: '입력하세요',
  },
};

/**
 * 이메일 입력 필드입니다.
 */
export const Email: Story = {
  args: {
    type: 'email',
    placeholder: 'email@example.com',
  },
};

/**
 * 비밀번호 입력 필드입니다.
 */
export const Password: Story = {
  args: {
    type: 'password',
    placeholder: '비밀번호를 입력하세요',
  },
};

/**
 * 숫자 입력 필드입니다.
 */
export const Number: Story = {
  args: {
    type: 'number',
    placeholder: '숫자를 입력하세요',
  },
};

/**
 * 비활성화된 입력 필드입니다.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: '비활성화된 입력 필드',
    value: '수정할 수 없습니다',
  },
};

/**
 * Label과 함께 사용하는 예시입니다.
 */
export const WithLabel: Story = {
  render: () => (
    <div className="space-y-2 w-[300px]">
      <Label htmlFor="email">이메일</Label>
      <Input id="email" type="email" placeholder="email@example.com" />
    </div>
  ),
};

/**
 * 여러 입력 필드를 한 번에 보여줍니다.
 */
export const AllTypes: Story = {
  render: () => (
    <div className="space-y-4 w-[300px]">
      <div className="space-y-2">
        <Label htmlFor="text">텍스트</Label>
        <Input id="text" type="text" placeholder="텍스트를 입력하세요" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">이메일</Label>
        <Input id="email" type="email" placeholder="email@example.com" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">비밀번호</Label>
        <Input id="password" type="password" placeholder="비밀번호를 입력하세요" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="number">숫자</Label>
        <Input id="number" type="number" placeholder="숫자를 입력하세요" />
      </div>
    </div>
  ),
};

