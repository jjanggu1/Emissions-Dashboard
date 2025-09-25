import { companies, posts } from "./seed";
import type { PostType } from "@/types";

let _companies = [...companies];
let _posts = [...posts];

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
const jitter = () => 200 + Math.random() * 600;
const maybeFail = () => Math.random() < 0.15;

export async function fetchCompanies() {
  await delay(jitter());
  return _companies;
}

export async function fetchPosts() {
  await delay(jitter());
  return _posts;
}

/**
 * createOrUpdatePost:
 * - p.id 있으면 업데이트(기존 id와 매칭된 항목 교체)
 * - p.id 없으면 생성 (crypto.randomUUID로 id 발급)
 * - 쓰기 작업에 15% 확률로 실패(예외 throw)
 * - 지연시간 200~800ms 시뮬레이션
 */
export async function createOrUpdatePost(p: Omit<PostType, "id"> & { id?: string }) {
  await delay(jitter());
  if (maybeFail()) throw new Error("Save failed");
  if (p.id) {
    _posts = _posts.map((x) => (x.id === p.id ? (p as PostType) : x));
    return p as PostType;
  }
  const created = { ...p, id: crypto.randomUUID() };
  _posts = [..._posts, created];
  return created;
}
