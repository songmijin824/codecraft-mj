// src/app/api/note/route.ts
import { NextResponse } from 'next/server';
import axios from 'axios';

const obsidianApi = axios.create({
  baseURL: process.env.OBSIDIAN_API_ORIGIN, // 예: http://127.0.0.1:27123
  timeout: 15000,
});

// 안전한 URL 결합 헬퍼 (앞/뒤 슬래시 문제 방지)
function joinPath(base: string, path: string) {
  return new URL(path.replace(/^\/+/, ''), base.endsWith('/') ? base : base + '/').toString();
}

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // 1) 헬스 체크(선택) – 서버가 살아있는지 먼저 확인
    const pingUrl = joinPath(process.env.OBSIDIAN_API_ORIGIN!, '/');
    const ping = await obsidianApi.get(pingUrl).catch(() => null);

    // 2) 대표 엔드포인트 후보들을 순차 시도
    //    플러그인 설정/버전에 따라 '/vault' vs '/vault/' 차이로 404가 날 수 있음
    const candidates = [
      joinPath(process.env.OBSIDIAN_API_ORIGIN!, '/vault?recursive=true'),
      joinPath(process.env.OBSIDIAN_API_ORIGIN!, '/vault'),
      joinPath(process.env.OBSIDIAN_API_ORIGIN!, '/vault/'),
      // 필요시 다른 후보 추가: '/vault/files', '/files'
    ];

    let files: string[] | null = null;
    let lastErr: any = null;

    for (const url of candidates) {
      try {
        const res = await obsidianApi.get(url, { validateStatus: () => true });
        if (res.status >= 200 && res.status < 300) {
          // 응답 형태 다양성 방어
          const data = res.data;
          const arr =
            Array.isArray(data?.files) ? data.files :
            Array.isArray(data) ? data :
            Array.isArray(data?.data) ? data.data :
            null;

          if (arr) {
            files = arr.map(String);
            break;
          }
        } else {
          lastErr = { status: res.status, data: res.data, tried: url };
        }
      } catch (e: any) {
        lastErr = { message: e?.message, tried: url };
      }
    }

    if (!files) {
      // 모든 후보 실패 → 404/500을 클라에 구조화해 전달
      return NextResponse.json(
        {
          error: true,
          message: 'Upstream returned no file list.',
          detail: lastErr,
          pingOk: !!ping,
        },
        { status: (lastErr?.status === 404 ? 502 : 500) } // upstream 404라도 프록시 관점에선 502가 합리적
      );
    }

    // md만 필터 (오타 수정)
    const mdFiles = files.filter((f) => f.endsWith('.md'));

    return NextResponse.json(
      {
        count: mdFiles.length,
        files: mdFiles,
      },
      { status: 200 }
    );
  } catch (e: any) {
    console.error('[api/note] GET fatal:', e);
    return NextResponse.json(
      {
        error: true,
        message: e?.message ?? 'Unknown server error',
      },
      { status: 500 }
    );
  }
}
