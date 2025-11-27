/**
 * 도메인 타입 정의
 * ManagementPage에서 사용하는 공통 타입들을 관리합니다.
 */

import type { User } from '../services/userService';
import type { Post } from '../services/postService';

/**
 * 관리할 엔티티의 타입 ('user' | 'post')
 */
export type EntityType = 'user' | 'post';

/**
 * User 또는 Post를 나타내는 공통 타입
 */
export type Entity = User | Post;

/**
 * User 폼 데이터 타입
 */
export type UserFormData = {
  username?: string;
  email?: string;
  role?: User['role'];
  status?: User['status'];
};

/**
 * Post 폼 데이터 타입
 */
export type PostFormData = {
  title?: string;
  content?: string;
  author?: string;
  category?: string;
  status?: Post['status'];
};

/**
 * 엔티티 타입에 따른 폼 데이터 유니온 타입
 */
export type EntityFormData = UserFormData | PostFormData;

/**
 * 폼 필드 값 타입 (string, number, boolean 등)
 */
export type FormFieldValue = string | number | boolean | undefined;

