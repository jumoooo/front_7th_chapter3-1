import type { Meta, StoryObj } from '@storybook/react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from './select';
import { Label } from './label';

const meta = {
  title: 'UI/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 Select입니다.
 */
export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="옵션을 선택하세요" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">옵션 1</SelectItem>
        <SelectItem value="option2">옵션 2</SelectItem>
        <SelectItem value="option3">옵션 3</SelectItem>
      </SelectContent>
    </Select>
  ),
};

/**
 * Label과 함께 사용하는 예시입니다.
 */
export const WithLabel: Story = {
  render: () => (
    <div className="space-y-2 w-[300px]">
      <Label htmlFor="role">역할</Label>
      <Select>
        <SelectTrigger id="role">
          <SelectValue placeholder="역할을 선택하세요" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="admin">관리자</SelectItem>
          <SelectItem value="user">사용자</SelectItem>
          <SelectItem value="guest">게스트</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};

/**
 * 그룹이 있는 Select입니다.
 */
export const WithGroups: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="카테고리를 선택하세요" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>프론트엔드</SelectLabel>
          <SelectItem value="react">React</SelectItem>
          <SelectItem value="vue">Vue</SelectItem>
          <SelectItem value="angular">Angular</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>백엔드</SelectLabel>
          <SelectItem value="node">Node.js</SelectItem>
          <SelectItem value="python">Python</SelectItem>
          <SelectItem value="java">Java</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};

/**
 * 여러 Select를 한 번에 보여줍니다.
 */
export const Multiple: Story = {
  render: () => (
    <div className="space-y-4 w-[300px]">
      <div className="space-y-2">
        <Label htmlFor="country">국가</Label>
        <Select>
          <SelectTrigger id="country">
            <SelectValue placeholder="국가를 선택하세요" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="kr">한국</SelectItem>
            <SelectItem value="us">미국</SelectItem>
            <SelectItem value="jp">일본</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="city">도시</Label>
        <Select>
          <SelectTrigger id="city">
            <SelectValue placeholder="도시를 선택하세요" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="seoul">서울</SelectItem>
            <SelectItem value="busan">부산</SelectItem>
            <SelectItem value="daegu">대구</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  ),
};

