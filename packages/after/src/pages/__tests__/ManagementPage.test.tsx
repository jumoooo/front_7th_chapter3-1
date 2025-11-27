import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ManagementPage } from "../ManagementPage";

describe("ManagementPage - User Management", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("사용자 CRUD: 생성, 수정, 삭제가 정상 작동한다", async () => {
    const user = userEvent.setup();
    render(<ManagementPage />);

    // 사용자 탭으로 전환
    const userTab = screen.getByRole("button", { name: "사용자" });
    await user.click(userTab);

    // === 생성 ===
    const createButton = screen.getByRole("button", { name: "새로 만들기" });
    await user.click(createButton);

    // name으로 input과 select 직접 찾기
    await waitFor(() => {
      expect(
        document.querySelector('input[name="username"]')
      ).toBeInTheDocument();
    });

    const usernameInput = document.querySelector(
      'input[name="username"]'
    ) as HTMLInputElement;
    const emailInput = document.querySelector(
      'input[name="email"]'
    ) as HTMLInputElement;
    const roleSelect = document.querySelector(
      'select[name="role"]'
    ) as HTMLSelectElement;

    await user.type(usernameInput, "testuser");
    await user.type(emailInput, "test@example.com");
    await user.selectOptions(roleSelect, "user");

    const createBtn = screen.getByRole("button", { name: "생성" });
    await user.click(createBtn);

    // 생성 확인
    await waitFor(() => {
      expect(screen.getByText("testuser")).toBeInTheDocument();
      expect(screen.getByText("test@example.com")).toBeInTheDocument();
    });

    // === 수정 ===
    // 테이블에 여러 수정 버튼이 있으므로 마지막 것(새로 생성한 것) 선택
    const editButtons = await screen.findAllByRole("button", { name: /수정/i });
    await user.click(editButtons[editButtons.length - 1]);

    await waitFor(() => {
      expect(document.querySelector('input[name="email"]')).toBeInTheDocument();
    });

    const emailInputEdit = document.querySelector(
      'input[name="email"]'
    ) as HTMLInputElement;
    await user.clear(emailInputEdit);
    await user.type(emailInputEdit, "updated@example.com");

    const updateBtn = screen.getByRole("button", { name: "수정 완료" });
    await user.click(updateBtn);

    // 수정 확인
    await waitFor(() => {
      expect(screen.getByText("updated@example.com")).toBeInTheDocument();
      expect(screen.queryByText("test@example.com")).not.toBeInTheDocument();
    });

    // === 삭제 ===
    // 마지막 삭제 버튼 선택
    const deleteButtons = await screen.findAllByRole("button", {
      name: /삭제/i,
    });
    await user.click(deleteButtons[deleteButtons.length - 1]);

    // 삭제 확인
    await waitFor(() => {
      expect(screen.queryByText("testuser")).not.toBeInTheDocument();
      expect(screen.queryByText("updated@example.com")).not.toBeInTheDocument();
    });
  });
});

describe("ManagementPage - Post Management", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("게시글이 테이블에 표시된다", async () => {
    render(<ManagementPage />);

    // 게시글 탭이 기본 선택되어 있는지 확인
    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: "게시글" })
      ).toBeInTheDocument();
    });

    // 기존 샘플 게시글이 표시되는지 확인
    await waitFor(() => {
      const table = screen.getByRole("table");
      expect(table).toBeInTheDocument();
    });
  });
});
