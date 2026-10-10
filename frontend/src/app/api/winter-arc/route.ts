import { POST as communityPost } from '../community/route';

export async function POST(request: Request) {
  return communityPost(request);
}
