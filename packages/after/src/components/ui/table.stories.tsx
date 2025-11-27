import type { Meta, StoryObj } from '@storybook/react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from './table';

const meta = {
  title: 'UI/Table',
  component: Table,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 테이블입니다.
 */
export const Default: Story = {
  render: () => (
    <Table className="w-[500px]">
      <TableCaption>사용자 목록</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>이름</TableHead>
          <TableHead>이메일</TableHead>
          <TableHead>역할</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>홍길동</TableCell>
          <TableCell>hong@example.com</TableCell>
          <TableCell>관리자</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>김철수</TableCell>
          <TableCell>kim@example.com</TableCell>
          <TableCell>사용자</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>이영희</TableCell>
          <TableCell>lee@example.com</TableCell>
          <TableCell>사용자</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

/**
 * Footer가 있는 테이블입니다.
 */
export const WithFooter: Story = {
  render: () => (
    <Table className="w-[500px]">
      <TableHeader>
        <TableRow>
          <TableHead>제품</TableHead>
          <TableHead className="text-right">가격</TableHead>
          <TableHead className="text-right">수량</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>노트북</TableCell>
          <TableCell className="text-right">1,200,000원</TableCell>
          <TableCell className="text-right">2</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>마우스</TableCell>
          <TableCell className="text-right">50,000원</TableCell>
          <TableCell className="text-right">5</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>키보드</TableCell>
          <TableCell className="text-right">150,000원</TableCell>
          <TableCell className="text-right">3</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>총계</TableCell>
          <TableCell className="text-right">2,800,000원</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
};

/**
 * Caption이 있는 테이블입니다.
 */
export const WithCaption: Story = {
  render: () => (
    <Table className="w-[500px]">
      <TableCaption>2024년 월별 매출 현황</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>월</TableHead>
          <TableHead className="text-right">매출</TableHead>
          <TableHead className="text-right">비고</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>1월</TableCell>
          <TableCell className="text-right">10,000,000원</TableCell>
          <TableCell className="text-right">-</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>2월</TableCell>
          <TableCell className="text-right">12,000,000원</TableCell>
          <TableCell className="text-right">+20%</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>3월</TableCell>
          <TableCell className="text-right">15,000,000원</TableCell>
          <TableCell className="text-right">+25%</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

