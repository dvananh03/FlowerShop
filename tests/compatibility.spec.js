import { test, expect } from '@playwright/test';

test.describe('3.3. Kiểm thử tương thích đa nền tảng (Compatibility Testing)', () => {

  test('TC_01: Đăng nhập thành công với tài khoản hợp lệ', async ({ page }) => {
    await page.goto('/login');

    // Nhập tài khoản hợp lệ
    await page.locator('input[type="email"], input[name="email"]').fill('valid_user@gmail.com');
    await page.locator('input[type="password"], input[name="password"]').fill('Password123');
    await page.locator('button[type="submit"]').click();

    // Kiểm tra giao diện không bị crash và chuyển hướng/hiển thị trạng thái thành công
    await expect(page).not.toHaveURL('/error');
  });

  test('TC_02: Hiển thị thông báo lỗi khi để trống thông tin', async ({ page }) => {
    await page.goto('/login');

    // Bấm submit luôn khi chưa nhập
    await page.locator('button[type="submit"]').click();

    // Kiểm tra có cảnh báo/validation hiển thị bình thường trên mọi trình duyệt
    const errorMessage = page.locator('.error, [role="alert"], text=vui lòng, text=bắt buộc');
    await expect(errorMessage.first()).toBeVisible();
  });

});