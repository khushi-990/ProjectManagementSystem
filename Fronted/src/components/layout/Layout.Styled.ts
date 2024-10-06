import { Layout } from 'antd';
import { theme } from 'style/Theme';

import { styled } from 'styled-components';

export const StyledLayout = styled(Layout)`
  --headerHeight: 60px;
  --footerHeight: 56px;
  --bodyHeight: calc(100vh - var(--headerHeight));

  .avtar-title {
    font-size: 16px;
    display: inline-block;
    margin-right: 10px;
  }

  /* Sidebar */
  .logoWrapper {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    img {
      display: inline-block;
      max-width: 160px;
    }
  }

  &.ant-layout {
    min-height: 100vh;
    .ant-layout-has-sider {
      height: 100%;
      min-height: unset;
    }
    .ant-layout-sider {
      min-height: 100vh;
      .ant-layout-sider-trigger {
        height: var(--footerHeight);
        line-height: var(--footerHeight);
        background: ${theme.color.primaryDark};
        color: ${theme.color.white};
        font-size: 20px;
      }
    }
  }
  /* Header */
  .ant-layout-header {
    height: var(--headerHeight);

    .profile-avatar {
      padding: 4px;
      background-color: ${theme?.color?.white};
    }
  }

  /* Content */
  .ant-layout-content {
    width: 100%;
    height: var(--bodyHeight);
    overflow: hidden;
    display: flex;
  }

  .ant-menu {
    &.sidebarMenu {
      height: var(--bodyHeight);
      overflow: auto;
      padding-bottom: 56px;
      .ant-menu-submenu {
        .ant-menu-submenu-arrow {
          color: ${theme?.color.white};
        }
        .ant-menu-submenu-title:hover {
          .ant-menu-title-content,
          .ant-menu-submenu-arrow {
            color: ${theme?.color.primary};
          }
          .anticon {
            * {
              fill: ${theme?.color.primary};
              color: ${theme?.color.primary};
            }
          }
        }
        &.ant-menu-submenu-selected {
          .ant-menu-submenu-title {
            .ant-menu-title-content {
              color: ${theme?.color.white};
            }
          }
          &.ant-menu-submenu-active {
            .ant-menu-submenu-title {
              .ant-menu-title-content,
              .ant-menu-submenu-arrow {
                color: ${theme?.color.primary};
              }
              .anticon {
                * {
                  fill: ${theme?.color.primary};
                  color: ${theme?.color.primary};
                }
              }
            }
          }
        }
      }
      .ant-menu-item,
      .ant-menu-submenu {
        .anticon {
          min-width: 24px;
          * {
            fill: ${theme?.color.white};
            color: ${theme?.color.white};
          }
        }
      }
      .ant-menu-item {
        &.ant-menu-item-active,
        &.ant-menu-item-selected {
          .anticon {
            * {
              fill: ${theme?.color.primary};
              color: ${theme?.color.primary};
            }
          }
        }
      }
    }
    &.ant-menu-inline-collapsed {
      > .ant-menu-item,
      > .ant-menu-submenu > .ant-menu-submenu-title {
        padding-inline: calc(50% - 14px - 3px);
        .ant-menu-item-icon {
          vertical-align: -0.4em;
        }
      }
      .ant-menu-submenu-open.ant-menu-submenu-selected {
        &.ant-menu-submenu-active .ant-menu-submenu-title {
          .anticon {
            * {
              fill: ${theme?.color.white};
              color: ${theme?.color.white};
            }
          }
        }
      }
    }
  }
  .content-body {
    padding: 15px 0;
    width: 100%;
  }
  .content-wrap {
    padding: 0 15px;
    overflow: auto;
    height: 100%;
  }
`;
