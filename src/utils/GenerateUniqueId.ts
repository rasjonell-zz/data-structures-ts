export type UniqueId = string;

export default function ID(): UniqueId {
  return Math.random().toString(36).substr(2, 9);
}
