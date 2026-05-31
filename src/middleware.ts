import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get('host') || '';

  // 如果用户访问的是 Cloudflare Pages 的默认域名，永久重定向(301)到自定义主域名
  if (hostname.includes('.pages.dev')) {
    url.hostname = 'kirk.hk';
    url.port = ''; // 确保没有端口号
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

// 配置需要进行拦截匹配的路径
export const config = {
  matcher: [
    /*
     * 匹配所有路径，除了：
     * 1. /api/ (API 路由)
     * 2. /_next/ (Next.js 内部静态资源)
     * 3. /_static/ (公共静态资源)
     * 4. /favicon.ico, /sitemap.xml (SEO 相关文件)
     */
    '/((?!api|_next|_static|favicon.ico|sitemap.xml).*)',
  ],
};
