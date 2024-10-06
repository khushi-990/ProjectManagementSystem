import { ConfigProvider } from 'antd';
import { theme } from 'style/Theme';

const ThemeConfig = ({ children }: any) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgContainer: `${theme?.color?.white}`,
          colorBgContainerDisabled: `${theme?.color?.primaryLight}`,
          colorBgTextHover: `${theme?.color?.primaryLight}`,
          colorBorder: `${theme?.color?.primary}`,
          colorInfo: `${theme?.color?.primary}`,
          colorSuccess: `${theme?.color?.success}`,
          colorError: `${theme?.color?.danger}`,
          colorWarning: `${theme?.color?.warning}`,
          colorLink: `${theme?.color?.black}`,
          colorLinkActive: `${theme?.color?.primaryActive}`,
          colorLinkHover: `${theme?.color?.primaryActive}`,
          colorPrimary: `${theme?.color?.primary}`,
          colorPrimaryActive: `${theme?.color?.primaryActive}`,
          colorPrimaryHover: `${theme?.color?.primaryActive}`,
          colorText: `${theme?.color?.black}`,
          colorTextPlaceholder: `${theme?.color?.placeholder}`,
          colorTextDisabled: `${theme?.color?.primary}`,
          borderRadius: 4,
          controlHeight: 36,
          controlOutline: 'transparent',
          fontSize: 14,
          fontFamily: `${theme?.font?.family?.sans}`,
          fontSizeLG: 14,
          lineHeight: 1,
          sizeStep: 4,
          borderRadiusSM: 2,
          wireframe: false
        },
        components: {
          Layout: {
            bodyBg: `${theme?.color?.light}`,
            footerBg: `${theme?.color?.white}`,
            footerPadding: '20px 30px',
            headerBg: `${theme?.color?.white}`,
            headerHeight: 64,
            headerPadding: '0 30px',
            siderBg: `${theme?.color?.white}`,
            triggerBg: `${theme?.color?.light}`,
            triggerColor: `${theme?.color?.black}`,
            triggerHeight: 56
          },
          Button: {
            defaultBorderColor: `${theme?.color?.primary}`,
            defaultColor: `${theme?.color?.primary}`,
            colorText: `${theme?.color?.primary}`,
            textHoverBg: `${theme?.color?.primaryActive}`,
            algorithm: true,
            controlHeight: 40,
            primaryShadow: 'none'
          },
          Checkbox: {
            lineWidthBold: 2,
            lineHeight: 1.286
          },
          DatePicker: {
            colorIconHover: `${theme?.color?.primary}`
          },
          Form: {
            algorithm: true,
            controlHeight: 38,
            controlHeightLG: 44,
            itemMarginBottom: 24,
            labelColor: `${theme?.color?.dark}`,
            labelFontSize: 14,
            labelHeight: 24,
            verticalLabelPadding: '0 0 6px',
            colorError: `${theme?.color?.danger}`,
            lineHeight: 2
          },
          Select: {
            controlOutline: `${theme?.color?.primary}`,
            controlItemBgActive: `${theme?.color?.primaryLight}`,
            lineHeight: 1.2
          },
          TreeSelect: {
            controlItemBgActive: `${theme?.color?.primaryLight}`,
            titleHeight: 28
          },
          Collapse: {
            colorBorder: `${theme?.color?.primary}`,
            colorTextHeading: `${theme?.color?.primary}`,
            contentBg: `${theme?.color?.white}`,
            headerBg: 'transparent'
          },
          Alert: {
            colorInfoBg: `${theme?.color?.primaryLight}`
          },
          Table: {
            cellPaddingInline: 12,
            cellPaddingBlock: 14,
            rowHoverBg: `${theme?.color?.primaryeLight}`,
            lineHeight: 1.4
          },
          Transfer: {
            controlItemBgActive: `${theme?.color?.primaryLight}`
          },
          Menu: {
            algorithm: true,
            darkItemColor: `${theme?.color?.white}`, // Dark => Icon color
            darkItemBg: `${theme?.color?.primary}`, // Dark => Menu background color
            darkItemSelectedBg: `${theme?.color?.white}`, // Dark => Menu selected color
            darkItemSelectedColor: `${theme?.color?.primary}`, // Dark => Selected menu icon color
            darkItemHoverBg: `${theme?.color?.white}`, // Dark => Menu hover background color
            darkItemHoverColor: `${theme?.color?.primary}`, // Dark => Menu hover color
            darkSubMenuItemBg: `${theme?.color?.primary}`, // Dark => Submenu list background color
            iconSize: 16
          },
          Tag: {
            colorBorder: `${theme?.color?.placeholder}`
          }
        }
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default ThemeConfig;
