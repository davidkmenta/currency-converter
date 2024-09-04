import { test, expect } from '@playwright/test';

test('should get page title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('React Currency Converter');
});

test('should convert filled amount into two different currencies', async ({ page }) => {
  await page.goto('/');

  await page.getByLabel('How much CZK do you want to convert?').pressSequentially('85373.273', {delay: 100});
  await page.getByLabel('How much CZK do you want to convert?').press('Backspace', {delay: 100});

  await page.getByTestId('currency-picker-dropdown').selectOption('ISK');

  await expect(page.getByTestId('currency-conversion-result')).toBeVisible();
  await expect(page.getByTestId('currency-conversion-result')).toHaveText(/^ISK \d+[,. ]?\d+[,. ]?\d{2,3}$/);

  await page.getByTestId('currency-picker-dropdown').selectOption('EUR');

  await expect(page.getByTestId('currency-conversion-result')).toHaveText(/^€\d+[,. ]?\d+[,. ]?\d{2,3}$/);
  await expect(page.getByTestId('pick-currency-EUR')).toBeChecked();
});

test('should pick currency from list', async ({ page }) => {
  await page.goto('/');

  await page.getByTestId('pick-currency-MXN').click();

  await expect(page.getByTestId('currency-picker-dropdown')).toHaveValue('MXN');
});
