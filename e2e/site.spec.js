import { test, expect } from '@playwright/test';

test.describe('AETHERIC Studio E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    // 로컬 개발 서버 주소 (Vite 기본값)
    await page.goto('http://localhost:5173');
  });

  test('초기 로딩 및 히어로 섹션 검증', async ({ page }) => {
    // 프리로더가 사라질 때까지 대기
    await expect(page.locator('h1')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('h1')).toContainText('An archive of');
  });

  test('섹션 이동 및 뷰포트 노출 확인', async ({ page }) => {
    const workSection = page.locator('#work');
    
    // 섹션으로 직접 스크롤 이동
    await workSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000); 
    
    // 섹션이 화면에 보이는지 확인
    await expect(workSection).toBeVisible();
    await expect(workSection).toBeInViewport();
  });

  test('프로젝트 리스트 호버 인터랙션', async ({ page }) => {
    const firstProject = page.locator('.index-row').first();
    await firstProject.hover();
    
    // 호버 시 나타나는 플로팅 프리뷰 이미지 확인
    const previewImage = page.locator('img[alt=""]').first();
    await expect(previewImage).toBeVisible();
  });

  test('접근성: 포커스 가시성 검증', async ({ page }) => {
    await page.keyboard.press('Tab');
    const skipLink = page.locator('.skip-link');
    await expect(skipLink).toBeFocused();
    
    // 여러 번 탭하여 프로젝트 리스트로 이동
    for(let i=0; i<10; i++) await page.keyboard.press('Tab');
    
    const focusedElement = page.locator(':focus');
    // index.css에서 수정한 focus-visible 스타일이 적용되는지 확인 (간접 검증)
    const outline = await focusedElement.evaluate(el => window.getComputedStyle(el).outline);
    expect(outline).not.toBe('none');
  });
});
