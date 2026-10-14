import { test, expect } from '@playwright/test';

test.describe('Kiểm thử chức năng Đăng nhập trên Mobile Web (16 Test Cases theo EP & BVA)', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  // -------------------------------------------------------------
  // 1. NHÓM VALID PARTITION (1 CA HỢP LỆ TOÀN DIỆN)
  // -------------------------------------------------------------
  test('TC_01 [Valid Partition]: Đăng nhập với Email và Mật khẩu hoàn toàn hợp lệ', async ({ page }) => {
    await page.getByRole('textbox', { name: 'yourname@email.com' }).fill('khachhang@gmail.com');
    await page.getByRole('textbox', { name: '••••••••' }).fill('Khachhang123');
    await page.getByRole('button', { name: 'Đăng nhập' }).click();

    // Không hiển thị bất kỳ thông báo lỗi validation nào
    await expect(page.getByText('Vui lòng nhập email')).not.toBeVisible();
    await expect(page.getByText('Vui lòng nhập mật khẩu')).not.toBeVisible();
  });

  // -------------------------------------------------------------
  // 2. NHÓM INVALID PARTITION (10 CA PHÂN VÙNG KHÔNG HỢP LỆ)
  // -------------------------------------------------------------
  test('TC_02 [Invalid Partition]: Báo lỗi khi Email để trống (< 1 ký tự)', async ({ page }) => {
    await page.getByRole('textbox', { name: '••••••••' }).fill('Khachhang123');
    await page.getByRole('button', { name: 'Đăng nhập' }).click();
    await expect(page.getByText('Vui lòng nhập email')).toBeVisible();
  });

  test('TC_03 [Invalid Partition]: Báo lỗi khi Email dài hơn 54 ký tự (60 ký tự)', async ({ page }) => {
    const longEmail = 'a123456789b123456789c123456789d123456789e1234567890@gmail.com'; // 60 ký tự
    await page.getByRole('textbox', { name: 'yourname@email.com' }).fill(longEmail);
    await page.getByRole('textbox', { name: '••••••••' }).fill('Khachhang123');
    await page.getByRole('button', { name: 'Đăng nhập' }).click();
    await expect(page.getByText('Email không được vượt quá 54 ký tự')).toBeVisible();
  });

  test('TC_04 [Invalid Partition]: Báo lỗi khi Email chứa khoảng trắng ở giữa', async ({ page }) => {
    await page.getByRole('textbox', { name: 'yourname@email.com' }).fill('khach hang@gmail.com');
    await page.getByRole('textbox', { name: '••••••••' }).fill('Khachhang123');
    await page.getByRole('button', { name: 'Đăng nhập' }).click();
    await expect(page.getByText('Email không được chứa khoảng trắng')).toBeVisible();
  });

  test('TC_05 [Invalid Partition]: Báo lỗi khi Email thiếu ký tự @', async ({ page }) => {
    await page.getByRole('textbox', { name: 'yourname@email.com' }).fill('khachhanggmail.com');
    await page.getByRole('textbox', { name: '••••••••' }).fill('Khachhang123');
    await page.getByRole('button', { name: 'Đăng nhập' }).click();
    await expect(page.getByText('Email không đúng định dạng')).toBeVisible();
  });

  test('TC_06 [Invalid Partition]: Báo lỗi khi Mật khẩu ngắn hơn 8 ký tự (4 ký tự)', async ({ page }) => {
    await page.getByRole('textbox', { name: 'yourname@email.com' }).fill('khachhang@gmail.com');
    await page.getByRole('textbox', { name: '••••••••' }).fill('Pass');
    await page.getByRole('button', { name: 'Đăng nhập' }).click();
    await expect(page.getByText('Mật khẩu phải có tối thiểu 8 ký tự')).toBeVisible();
  });

  test('TC_07 [Invalid Partition]: Báo lỗi khi Mật khẩu dài hơn 64 ký tự (70 ký tự)', async ({ page }) => {
    const longPass = 'Pass1234' + 'a'.repeat(62); // 70 ký tự > 64
    await page.getByRole('textbox', { name: 'yourname@email.com' }).fill('khachhang@gmail.com');
    await page.getByRole('textbox', { name: '••••••••' }).fill(longPass);
    await page.getByRole('button', { name: 'Đăng nhập' }).click();
    await expect(page.getByText('Mật khẩu không được vượt quá 64 ký tự')).toBeVisible();
  });

  test('TC_08 [Invalid Partition]: Báo lỗi khi Mật khẩu để trống (Rỗng)', async ({ page }) => {
    await page.getByRole('textbox', { name: 'yourname@email.com' }).fill('khachhang@gmail.com');
    await page.getByRole('button', { name: 'Đăng nhập' }).click();
    await expect(page.getByText('Vui lòng nhập mật khẩu')).toBeVisible();
  });

  test('TC_09 [Invalid Partition]: Báo lỗi khi Mật khẩu chứa khoảng trắng (Pass 1234)', async ({ page }) => {
    await page.getByRole('textbox', { name: 'yourname@email.com' }).fill('khachhang@gmail.com');
    await page.getByRole('textbox', { name: '••••••••' }).fill('Pass 1234');
    await page.getByRole('button', { name: 'Đăng nhập' }).click();
    await expect(page.getByText('Mật khẩu không được chứa khoảng trắng')).toBeVisible();
  });

  test('TC_10 [Invalid Partition]: Báo lỗi khi Mật khẩu không chứa chữ cái (chỉ có số)', async ({ page }) => {
    await page.getByRole('textbox', { name: 'yourname@email.com' }).fill('khachhang@gmail.com');
    await page.getByRole('textbox', { name: '••••••••' }).fill('12345678');
    await page.getByRole('button', { name: 'Đăng nhập' }).click();
    await expect(page.getByText('Mật khẩu phải chứa ít nhất một chữ cái và một chữ số')).toBeVisible();
  });

  test('TC_11 [Invalid Partition]: Báo lỗi khi Mật khẩu không chứa chữ số (chỉ có chữ)', async ({ page }) => {
    await page.getByRole('textbox', { name: 'yourname@email.com' }).fill('khachhang@gmail.com');
    await page.getByRole('textbox', { name: '••••••••' }).fill('passwordabc');
    await page.getByRole('button', { name: 'Đăng nhập' }).click();
    await expect(page.getByText('Mật khẩu phải chứa ít nhất một chữ cái và một chữ số')).toBeVisible();
  });

  // -------------------------------------------------------------
  // 3. NHÓM VALID BOUNDARY (2 CA BIÊN HỢP LỆ)
  // -------------------------------------------------------------
  test('TC_12 [Valid Boundary]: Kết hợp biên dưới hợp lệ (Email 1 ký tự username, Mật khẩu 8 ký tự)', async ({ page }) => {
    await page.getByRole('textbox', { name: 'yourname@email.com' }).fill('a@gmail.com');
    await page.getByRole('textbox', { name: '••••••••' }).fill('Pass1234');
    await page.getByRole('button', { name: 'Đăng nhập' }).click();
    await expect(page.getByText('Vui lòng nhập email')).not.toBeVisible();
    await expect(page.getByText('Mật khẩu phải có tối thiểu 8 ký tự')).not.toBeVisible();
  });

  test('TC_13 [Valid Boundary]: Kết hợp biên trên hợp lệ (Email đúng 54 ký tự, Mật khẩu đúng 64 ký tự)', async ({ page }) => {
    // 44 ký tự username + 10 ký tự @gmail.com = đúng 54 ký tự
    const email54 = 'a123456789b123456789c123456789d123456789e123@gmail.com'; 
    // 8 ký tự prefix + 56 ký tự 'a' = đúng 64 ký tự
    const pass64 = 'Pass1234' + 'a'.repeat(56);
    await page.getByRole('textbox', { name: 'yourname@email.com' }).fill(email54);
    await page.getByRole('textbox', { name: '••••••••' }).fill(pass64);
    await page.getByRole('button', { name: 'Đăng nhập' }).click();
    await expect(page.getByText('Email không được vượt quá 54 ký tự')).not.toBeVisible();
    await expect(page.getByText('Mật khẩu không được vượt quá 64 ký tự')).not.toBeVisible();
  });

  // -------------------------------------------------------------
  // 4. NHÓM INVALID BOUNDARY (3 CA BIÊN KHÔNG HỢP LỆ)
  // -------------------------------------------------------------
  test('TC_14 [Invalid Boundary]: Báo lỗi khi Email ở biên trên vi phạm (55 ký tự)', async ({ page }) => {
    // 45 ký tự username + 10 ký tự @gmail.com = đúng 55 ký tự
    const email55 = 'a123456789b123456789c123456789d123456789e1234@gmail.com';
    await page.getByRole('textbox', { name: 'yourname@email.com' }).fill(email55);
    await page.getByRole('textbox', { name: '••••••••' }).fill('Khachhang123');
    await page.getByRole('button', { name: 'Đăng nhập' }).click();
    await expect(page.getByText('Email không được vượt quá 54 ký tự')).toBeVisible();
  });

  test('TC_15 [Invalid Boundary]: Báo lỗi khi Mật khẩu ở biên dưới vi phạm (7 ký tự)', async ({ page }) => {
    await page.getByRole('textbox', { name: 'yourname@email.com' }).fill('khachhang@gmail.com');
    await page.getByRole('textbox', { name: '••••••••' }).fill('Pass123'); // đúng 7 ký tự
    await page.getByRole('button', { name: 'Đăng nhập' }).click();
    await expect(page.getByText('Mật khẩu phải có tối thiểu 8 ký tự')).toBeVisible();
  });

  test('TC_16 [Invalid Boundary]: Báo lỗi khi Mật khẩu ở biên trên vi phạm (65 ký tự)', async ({ page }) => {
    // 8 ký tự prefix + 57 ký tự 'a' = đúng 65 ký tự
    const pass65 = 'Pass1234' + 'a'.repeat(57);
    await page.getByRole('textbox', { name: 'yourname@email.com' }).fill('khachhang@gmail.com');
    await page.getByRole('textbox', { name: '••••••••' }).fill(pass65);
    await page.getByRole('button', { name: 'Đăng nhập' }).click();
    await expect(page.getByText('Mật khẩu không được vượt quá 64 ký tự')).toBeVisible();
  });
});
