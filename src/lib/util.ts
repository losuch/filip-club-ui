export function setLoginInfo(
  tenantName: string,
  tenantId: string,
  tenantCode: string
) {
  window.localStorage.setItem('tenantName', tenantName);
  window.localStorage.setItem('tenantId', tenantId);
  window.localStorage.setItem('tenantCode', tenantCode);
}
export function getLoginInfo() {
  const loginInfo = {
    tenantName: window.localStorage.getItem('tenantName'),
    tenantId: window.localStorage.getItem('tenantId'),
    tenantCode: window.localStorage.getItem('tenantCode'),
  };
  return loginInfo;
}
