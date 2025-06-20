import React from "react";
import { AuthContext } from "./authContext";
import { Routes, Route } from "react-router-dom";
import SnackBar from "./components/SnackBar";
import PublicHeader from "./components/PublicHeader";
import TopHeader from "./components/TopHeader";

import AdminHeader from "./components/AdminHeader";

import UserHeader from "./components/UserHeader";

import NotFoundPage from "./pages/NotFoundPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminForgotPage from "./pages/AdminForgotPage";
import AdminResetPage from "./pages/AdminResetPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminProfilePage from "./pages/AdminProfilePage";
import SessionExpiredModal from "./components/SessionExpiredModal";

import SocialLoginVerfication from "./pages/SocialLogin/SocialLoginVerfication";
import AddAdminCmsPage from "./pages/AddAdminCmsPage";
import AddAdminEmailPage from "./pages/AddAdminEmailPage";
import AddAdminPhotoPage from "./pages/AddAdminPhotoPage";
import AdminChatPage from "./pages/AdminChatPage";
import AdminCmsListPage from "./pages/AdminCmsListPage";
import AdminEmailListPage from "./pages/AdminEmailListPage";
import AdminPhotoListPage from "./pages/AdminPhotoListPage";
import EditAdminCmsPage from "./pages/EditAdminCmsPage";
import EditAdminEmailPage from "./pages/EditAdminEmailPage";
import UserMagicLoginPage from "./pages/MagicLogin/UserMagicLoginPage";
import MagicLoginVerifyPage from "./pages/MagicLogin/MagicLoginVerifyPage";
import AddAdminRarityTablePage from "./pages/AddAdminRarityTablePage";
import EditAdminRarityTablePage from "./pages/EditAdminRarityTablePage";
import ViewAdminRarityTablePage from "./pages/ViewAdminRarityTablePage";
import ListAdminRarityTablePage from "./pages/ListAdminRarityTablePage";
import AddAdminChildTablePage from "./pages/AddAdminChildTablePage";
import EditAdminChildTablePage from "./pages/EditAdminChildTablePage";
import ViewAdminChildTablePage from "./pages/ViewAdminChildTablePage";
import ListAdminChildTablePage from "./pages/ListAdminChildTablePage";
import AddAdminCore_outputTablePage from "./pages/AddAdminCore_outputTablePage";
import EditAdminCore_outputTablePage from "./pages/EditAdminCore_outputTablePage";
import ViewAdminCore_outputTablePage from "./pages/ViewAdminCore_outputTablePage";
import ListAdminCore_outputTablePage from "./pages/ListAdminCore_outputTablePage";
import AddAdminSettingTablePage from "./pages/AddAdminSettingTablePage";
import EditAdminSettingTablePage from "./pages/EditAdminSettingTablePage";
import ViewAdminSettingTablePage from "./pages/ViewAdminSettingTablePage";
import ListAdminSettingTablePage from "./pages/ListAdminSettingTablePage";
import AddAdminItem_typeTablePage from "./pages/AddAdminItem_typeTablePage";
import EditAdminItem_typeTablePage from "./pages/EditAdminItem_typeTablePage";
import ViewAdminItem_typeTablePage from "./pages/ViewAdminItem_typeTablePage";
import ListAdminItem_typeTablePage from "./pages/ListAdminItem_typeTablePage";
import AddAdminCoreTablePage from "./pages/AddAdminCoreTablePage";
import EditAdminCoreTablePage from "./pages/EditAdminCoreTablePage";
import ViewAdminCoreTablePage from "./pages/ViewAdminCoreTablePage";
import ListAdminCoreTablePage from "./pages/ListAdminCoreTablePage";
import AddAdminSchedulingTablePage from "./pages/AddAdminSchedulingTablePage";
import EditAdminSchedulingTablePage from "./pages/EditAdminSchedulingTablePage";
import ViewAdminSchedulingTablePage from "./pages/ViewAdminSchedulingTablePage";
import ListAdminSchedulingTablePage from "./pages/ListAdminSchedulingTablePage";
import AddAdminProjectsTablePage from "./pages/AddAdminProjectsTablePage";
import EditAdminProjectsTablePage from "./pages/EditAdminProjectsTablePage";
import ViewAdminProjectsTablePage from "./pages/ViewAdminProjectsTablePage";
import ListAdminProjectsTablePage from "./pages/ListAdminProjectsTablePage";
import AddAdminPostsTablePage from "./pages/AddAdminPostsTablePage";
import EditAdminPostsTablePage from "./pages/EditAdminPostsTablePage";
import ViewAdminPostsTablePage from "./pages/ViewAdminPostsTablePage";
import ListAdminPostsTablePage from "./pages/ListAdminPostsTablePage";
import AddAdminProject_itemsTablePage from "./pages/AddAdminProject_itemsTablePage";
import EditAdminProject_itemsTablePage from "./pages/EditAdminProject_itemsTablePage";
import ViewAdminProject_itemsTablePage from "./pages/ViewAdminProject_itemsTablePage";
import ListAdminProject_itemsTablePage from "./pages/ListAdminProject_itemsTablePage";
import AddAdminAdded_itemsTablePage from "./pages/AddAdminAdded_itemsTablePage";
import EditAdminAdded_itemsTablePage from "./pages/EditAdminAdded_itemsTablePage";
import ViewAdminAdded_itemsTablePage from "./pages/ViewAdminAdded_itemsTablePage";
import ListAdminAdded_itemsTablePage from "./pages/ListAdminAdded_itemsTablePage";
import AddAdminInventory_protectionTablePage from "./pages/AddAdminInventory_protectionTablePage";
import EditAdminInventory_protectionTablePage from "./pages/EditAdminInventory_protectionTablePage";
import ViewAdminInventory_protectionTablePage from "./pages/ViewAdminInventory_protectionTablePage";
import ListAdminInventory_protectionTablePage from "./pages/ListAdminInventory_protectionTablePage";
import AddAdminStripePricePage from "./pages/stripe/AddAdminStripePricePage";
import AddAdminStripeProductPage from "./pages/stripe/AddAdminStripeProductPage";
import AdminStripeInvoicesListPage from "./pages/stripe/AdminStripeInvoicesListPage";
import AdminStripeOrdersListPage from "./pages/stripe/AdminStripeOrdersListPage";
import AdminStripePricesListPage from "./pages/stripe/AdminStripePricesListPage";
import AdminStripeProductsListPage from "./pages/stripe/AdminStripeProductsListPage";
import AdminStripeSubscriptionsListPage from "./pages/stripe/AdminStripeSubscriptionsListPage";
import EditAdminStripePricePage from "./pages/stripe/EditAdminStripePricePage";
import EditAdminStripeProductPage from "./pages/stripe/EditAdminStripeProductPage";
import AdminUserListPage from "./pages/AdminUserListPage";
import AddAdminUserPage from "./pages/AddAdminUserPage";
import EditAdminUserPage from "./pages/EditAdminUserPage";
import AddUserRarityTablePage from "./pages/AddUserRarityTablePage";
import EditUserRarityTablePage from "./pages/EditUserRarityTablePage";
import ViewUserRarityTablePage from "./pages/ViewUserRarityTablePage";
import ListUserRarityTablePage from "./pages/ListUserRarityTablePage";
import AddUserChildTablePage from "./pages/AddUserChildTablePage";
import EditUserChildTablePage from "./pages/EditUserChildTablePage";
import ViewUserChildTablePage from "./pages/ViewUserChildTablePage";
import ListUserChildTablePage from "./pages/ListUserChildTablePage";
import AddUserCore_outputTablePage from "./pages/AddUserCore_outputTablePage";
import EditUserCore_outputTablePage from "./pages/EditUserCore_outputTablePage";
import ViewUserCore_outputTablePage from "./pages/ViewUserCore_outputTablePage";
import ListUserCore_outputTablePage from "./pages/ListUserCore_outputTablePage";
import AddUserSettingTablePage from "./pages/AddUserSettingTablePage";
import EditUserSettingTablePage from "./pages/EditUserSettingTablePage";
import ViewUserSettingTablePage from "./pages/ViewUserSettingTablePage";
import ListUserSettingTablePage from "./pages/ListUserSettingTablePage";
import AddUserItem_typeTablePage from "./pages/AddUserItem_typeTablePage";
import EditUserItem_typeTablePage from "./pages/EditUserItem_typeTablePage";
import ViewUserItem_typeTablePage from "./pages/ViewUserItem_typeTablePage";
import ListUserItem_typeTablePage from "./pages/ListUserItem_typeTablePage";
import AddUserCoreTablePage from "./pages/AddUserCoreTablePage";
import EditUserCoreTablePage from "./pages/EditUserCoreTablePage";
import ViewUserCoreTablePage from "./pages/ViewUserCoreTablePage";
import ListUserCoreTablePage from "./pages/ListUserCoreTablePage";
import AddUserSchedulingTablePage from "./pages/AddUserSchedulingTablePage";
import EditUserSchedulingTablePage from "./pages/EditUserSchedulingTablePage";
import ViewUserSchedulingTablePage from "./pages/ViewUserSchedulingTablePage";
import ListUserSchedulingTablePage from "./pages/ListUserSchedulingTablePage";
import AddUserProjectsTablePage from "./pages/AddUserProjectsTablePage";
import EditUserProjectsTablePage from "./pages/EditUserProjectsTablePage";
import ViewUserProjectsTablePage from "./pages/ViewUserProjectsTablePage";
import ListUserProjectsTablePage from "./pages/ListUserProjectsTablePage";
import AddUserPostsTablePage from "./pages/AddUserPostsTablePage";
import EditUserPostsTablePage from "./pages/EditUserPostsTablePage";
import ViewUserPostsTablePage from "./pages/ViewUserPostsTablePage";
import ListUserPostsTablePage from "./pages/ListUserPostsTablePage";
import AddUserProject_itemsTablePage from "./pages/AddUserProject_itemsTablePage";
import EditUserProject_itemsTablePage from "./pages/EditUserProject_itemsTablePage";
import ViewUserProject_itemsTablePage from "./pages/ViewUserProject_itemsTablePage";
import ListUserProject_itemsTablePage from "./pages/ListUserProject_itemsTablePage";
import AddUserAdded_itemsTablePage from "./pages/AddUserAdded_itemsTablePage";
import EditUserAdded_itemsTablePage from "./pages/EditUserAdded_itemsTablePage";
import ViewUserAdded_itemsTablePage from "./pages/ViewUserAdded_itemsTablePage";
import ListUserAdded_itemsTablePage from "./pages/ListUserAdded_itemsTablePage";
import AddUserInventory_protectionTablePage from "./pages/AddUserInventory_protectionTablePage";
import EditUserInventory_protectionTablePage from "./pages/EditUserInventory_protectionTablePage";
import ViewUserInventory_protectionTablePage from "./pages/ViewUserInventory_protectionTablePage";
import ListUserInventory_protectionTablePage from "./pages/ListUserInventory_protectionTablePage";
import ViewUserItemsAndValuesPage from "./pages/ViewUserItemsAndValuesPage";
import ViewCoreGachaPage from "./pages/ViewCoreGachaPage";
import ViewInventoryDuplicatePage from "./pages/ViewInventoryDuplicatePage";

import UserLoginPage from "./pages/UserLoginPage";
import UserLoginPage2 from "./pages/UserLoginPage2";
import UserSignUpPage from "./pages/UserSignUpPage";
import UserForgotPage from "./pages/UserForgotPage";
import UserResetPage from "./pages/UserResetPage";
import SocialLoginVerificationTemplate from "./pages/SocialLogin/SocialLoginVerfication";
import UserProfile from "./pages/UserProfile";


function renderHeader(role) {
  switch (role) {
    case "admin":
      return <AdminHeader />;

    case "user":
      return <UserHeader />;

    default:
      return <PublicHeader />;
  }
}

function renderTop(role) {
  switch (role) {
    case "admin":
      return <TopHeader />;

    case "user":
      return <TopHeader />;

    default:
      return <TopHeader />;
  }
}

function renderRoutes(role) {
  switch (role) {
    case "admin":
      return (
        <Routes>
          <Route
            path="/admin/dashboard"
            element={<AdminDashboardPage />}
          ></Route>
          <Route
            exact
            path="/admin/profile"
            element={<AdminProfilePage />}
          ></Route>
          <Route path="/admin/add-cms" element={<AddAdminCmsPage />}></Route>
          <Route
            path="/admin/add-email"
            element={<AddAdminEmailPage />}
          ></Route>
          <Route
            path="/admin/add-photo"
            element={<AddAdminPhotoPage />}
          ></Route>
          <Route path="/admin/chat" element={<AdminChatPage />}></Route>
          <Route path="/admin/cms" element={<AdminCmsListPage />}></Route>
          <Route path="/admin/email" element={<AdminEmailListPage />}></Route>
          <Route path="/admin/photo" element={<AdminPhotoListPage />}></Route>
          <Route
            path="/admin/edit-cms/:id"
            element={<EditAdminCmsPage />}
          ></Route>
          <Route
            path="/admin/edit-email/:id"
            element={<EditAdminEmailPage />}
          ></Route>
          <Route
            path="/admin/add-rarity"
            element={<AddAdminRarityTablePage />}
          ></Route>
          <Route
            path="/admin/edit-rarity/:id"
            element={<EditAdminRarityTablePage />}
          ></Route>
          <Route
            path="/admin/view-rarity/:id"
            element={<ViewAdminRarityTablePage />}
          ></Route>
          <Route
            path="/admin/rarity"
            element={<ListAdminRarityTablePage />}
          ></Route>
          <Route
            path="/admin/add-child"
            element={<AddAdminChildTablePage />}
          ></Route>
          <Route
            path="/admin/edit-child/:id"
            element={<EditAdminChildTablePage />}
          ></Route>
          <Route
            path="/admin/view-child/:id"
            element={<ViewAdminChildTablePage />}
          ></Route>
          <Route
            path="/admin/child"
            element={<ListAdminChildTablePage />}
          ></Route>
          <Route
            path="/admin/add-core_output"
            element={<AddAdminCore_outputTablePage />}
          ></Route>
          <Route
            path="/admin/edit-core_output/:id"
            element={<EditAdminCore_outputTablePage />}
          ></Route>
          <Route
            path="/admin/view-core_output/:id"
            element={<ViewAdminCore_outputTablePage />}
          ></Route>
          <Route
            path="/admin/core_output"
            element={<ListAdminCore_outputTablePage />}
          ></Route>
          <Route
            path="/admin/add-setting"
            element={<AddAdminSettingTablePage />}
          ></Route>
          <Route
            path="/admin/edit-setting/:id"
            element={<EditAdminSettingTablePage />}
          ></Route>
          <Route
            path="/admin/view-setting/:id"
            element={<ViewAdminSettingTablePage />}
          ></Route>
          <Route
            path="/admin/setting"
            element={<ListAdminSettingTablePage />}
          ></Route>
          <Route
            path="/admin/add-item_type"
            element={<AddAdminItem_typeTablePage />}
          ></Route>
          <Route
            path="/admin/edit-item_type/:id"
            element={<EditAdminItem_typeTablePage />}
          ></Route>
          <Route
            path="/admin/view-item_type/:id"
            element={<ViewAdminItem_typeTablePage />}
          ></Route>
          <Route
            path="/admin/item_type"
            element={<ListAdminItem_typeTablePage />}
          ></Route>
          <Route
            path="/admin/add-core"
            element={<AddAdminCoreTablePage />}
          ></Route>
          <Route
            path="/admin/edit-core/:id"
            element={<EditAdminCoreTablePage />}
          ></Route>
          <Route
            path="/admin/view-core/:id"
            element={<ViewAdminCoreTablePage />}
          ></Route>
          <Route
            path="/admin/core"
            element={<ListAdminCoreTablePage />}
          ></Route>
          <Route
            path="/admin/add-scheduling"
            element={<AddAdminSchedulingTablePage />}
          ></Route>
          <Route
            path="/admin/edit-scheduling/:id"
            element={<EditAdminSchedulingTablePage />}
          ></Route>
          <Route
            path="/admin/view-scheduling/:id"
            element={<ViewAdminSchedulingTablePage />}
          ></Route>
          <Route
            path="/admin/scheduling"
            element={<ListAdminSchedulingTablePage />}
          ></Route>
          <Route
            path="/admin/add-projects"
            element={<AddAdminProjectsTablePage />}
          ></Route>
          <Route
            path="/admin/edit-projects/:id"
            element={<EditAdminProjectsTablePage />}
          ></Route>
          <Route
            path="/admin/view-projects/:id"
            element={<ViewAdminProjectsTablePage />}
          ></Route>
          <Route
            path="/admin/projects"
            element={<ListAdminProjectsTablePage />}
          ></Route>
          <Route
            path="/admin/add-posts"
            element={<AddAdminPostsTablePage />}
          ></Route>
          <Route
            path="/admin/edit-posts/:id"
            element={<EditAdminPostsTablePage />}
          ></Route>
          <Route
            path="/admin/view-posts/:id"
            element={<ViewAdminPostsTablePage />}
          ></Route>
          <Route
            path="/admin/posts"
            element={<ListAdminPostsTablePage />}
          ></Route>
          <Route
            path="/admin/add-project_items"
            element={<AddAdminProject_itemsTablePage />}
          ></Route>
          <Route
            path="/admin/edit-project_items/:id"
            element={<EditAdminProject_itemsTablePage />}
          ></Route>
          <Route
            path="/admin/view-project_items/:id"
            element={<ViewAdminProject_itemsTablePage />}
          ></Route>
          <Route
            path="/admin/project_items"
            element={<ListAdminProject_itemsTablePage />}
          ></Route>
          <Route
            path="/admin/add-added_items"
            element={<AddAdminAdded_itemsTablePage />}
          ></Route>
          <Route
            path="/admin/edit-added_items/:id"
            element={<EditAdminAdded_itemsTablePage />}
          ></Route>
          <Route
            path="/admin/view-added_items/:id"
            element={<ViewAdminAdded_itemsTablePage />}
          ></Route>
          <Route
            path="/admin/added_items"
            element={<ListAdminAdded_itemsTablePage />}
          ></Route>
          <Route
            path="/admin/add-inventory_protection"
            element={<AddAdminInventory_protectionTablePage />}
          ></Route>
          <Route
            path="/admin/edit-inventory_protection/:id"
            element={<EditAdminInventory_protectionTablePage />}
          ></Route>
          <Route
            path="/admin/view-inventory_protection/:id"
            element={<ViewAdminInventory_protectionTablePage />}
          ></Route>
          <Route
            path="/admin/inventory_protection"
            element={<ListAdminInventory_protectionTablePage />}
          ></Route>
          <Route
            path="/admin/add-price"
            element={<AddAdminStripePricePage />}
          ></Route>
          <Route
            path="/admin/add-product"
            element={<AddAdminStripeProductPage />}
          ></Route>
          <Route
            path="/admin/invoice"
            element={<AdminStripeInvoicesListPage />}
          ></Route>
          <Route
            path="/admin/order"
            element={<AdminStripeOrdersListPage />}
          ></Route>
          <Route
            path="/admin/price"
            element={<AdminStripePricesListPage />}
          ></Route>
          <Route
            path="/admin/product"
            element={<AdminStripeProductsListPage />}
          ></Route>
          <Route
            path="/admin/subscription"
            element={<AdminStripeSubscriptionsListPage />}
          ></Route>
          <Route
            path="/admin/edit-price/:id"
            element={<EditAdminStripePricePage />}
          ></Route>
          <Route
            path="/admin/edit-product/:id"
            element={<EditAdminStripeProductPage />}
          ></Route>
          <Route path="/admin/users" element={<AdminUserListPage />}></Route>
          <Route path="/admin/add-user" element={<AddAdminUserPage />}></Route>
          <Route
            path="/admin/edit-user/:id"
            element={<EditAdminUserPage />}
          ></Route>
        </Routes>
      );
    case "user":
      return (
        <Routes>
          <Route
            path="/user/item-manager/table1"
            element={<ViewUserItemsAndValuesPage />}
          ></Route>
          <Route
            path="/user/item-manager/table2"
            element={<ViewCoreGachaPage />}
          ></Route>
          <Route
            path="/user/item-manager/table3"
            element={<ViewInventoryDuplicatePage />}
          ></Route>
          <Route
            path="/user/add-rarity"
            element={<AddUserRarityTablePage />}
          ></Route>
          <Route
            path="/user/edit-rarity/:id"
            element={<EditUserRarityTablePage />}
          ></Route>
          <Route
            path="/user/view-rarity/:id"
            element={<ViewUserRarityTablePage />}
          ></Route>
          <Route
            path="/user/rarity"
            element={<ListUserRarityTablePage />}
          ></Route>
          <Route
            path="/user/add-child"
            element={<AddUserChildTablePage />}
          ></Route>
          <Route
            path="/user/edit-child/:id"
            element={<EditUserChildTablePage />}
          ></Route>
          <Route
            path="/user/view-child/:id"
            element={<ViewUserChildTablePage />}
          ></Route>
          <Route
            path="/user/child"
            element={<ListUserChildTablePage />}
          ></Route>
          <Route
            path="/user/add-core_output"
            element={<AddUserCore_outputTablePage />}
          ></Route>
          <Route
            path="/user/edit-core_output/:id"
            element={<EditUserCore_outputTablePage />}
          ></Route>
          <Route
            path="/user/view-core_output/:id"
            element={<ViewUserCore_outputTablePage />}
          ></Route>
          <Route
            path="/user/core_output"
            element={<ListUserCore_outputTablePage />}
          ></Route>
          <Route
            path="/user/add-setting"
            element={<AddUserSettingTablePage />}
          ></Route>
          <Route
            path="/user/edit-setting/:id"
            element={<EditUserSettingTablePage />}
          ></Route>
          <Route
            path="/user/view-setting/:id"
            element={<ViewUserSettingTablePage />}
          ></Route>
          <Route
            path="/user/setting"
            element={<ListUserSettingTablePage />}
          ></Route>
          <Route
            path="/user/add-item_type"
            element={<AddUserItem_typeTablePage />}
          ></Route>
          <Route
            path="/user/edit-item_type/:id"
            element={<EditUserItem_typeTablePage />}
          ></Route>
          <Route
            path="/user/view-item_type/:id"
            element={<ViewUserItem_typeTablePage />}
          ></Route>
          <Route
            path="/user/item_type"
            element={<ListUserItem_typeTablePage />}
          ></Route>
          <Route
            path="/user/add-core"
            element={<AddUserCoreTablePage />}
          ></Route>
          <Route
            path="/user/edit-core/:id"
            element={<EditUserCoreTablePage />}
          ></Route>
          <Route
            path="/user/view-core/:id"
            element={<ViewUserCoreTablePage />}
          ></Route>
          <Route path="/user/core" element={<ListUserCoreTablePage />}></Route>
          <Route
            path="/user/add-scheduling"
            element={<AddUserSchedulingTablePage />}
          ></Route>
          <Route
            path="/user/edit-scheduling/:id"
            element={<EditUserSchedulingTablePage />}
          ></Route>
          <Route
            path="/user/view-scheduling/:id"
            element={<ViewUserSchedulingTablePage />}
          ></Route>
          <Route
            path="/user/scheduling"
            element={<ListUserSchedulingTablePage />}
          ></Route>
          <Route
            path="/user/add-projects"
            element={<AddUserProjectsTablePage />}
          ></Route>
          <Route
            path="/user/edit-projects/:id"
            element={<EditUserProjectsTablePage />}
          ></Route>
          <Route
            path="/user/view-projects/:id"
            element={<ViewUserProjectsTablePage />}
          ></Route>
          <Route
            path="/user/projects"
            element={<ListUserProjectsTablePage />}
          ></Route>
          <Route
            path="/user/add-posts"
            element={<AddUserPostsTablePage />}
          ></Route>
          <Route
            path="/user/edit-posts/:id"
            element={<EditUserPostsTablePage />}
          ></Route>
          <Route
            path="/user/view-posts/:id"
            element={<ViewUserPostsTablePage />}
          ></Route>
          <Route
            path="/user/posts"
            element={<ListUserPostsTablePage />}
          ></Route>
          <Route
            path="/user/add-project_items"
            element={<AddUserProject_itemsTablePage />}
          ></Route>
          <Route
            path="/user/edit-project_items/:id"
            element={<EditUserProject_itemsTablePage />}
          ></Route>
          <Route
            path="/user/view-project_items/:id"
            element={<ViewUserProject_itemsTablePage />}
          ></Route>
          <Route
            path="/user/project_items"
            element={<ListUserProject_itemsTablePage />}
          ></Route>
          <Route
            path="/user/add-added_items"
            element={<AddUserAdded_itemsTablePage />}
          ></Route>
          <Route
            path="/user/edit-added_items/:id"
            element={<EditUserAdded_itemsTablePage />}
          ></Route>
          <Route
            path="/user/view-added_items/:id"
            element={<ViewUserAdded_itemsTablePage />}
          ></Route>
          <Route
            path="/user/added_items"
            element={<ListUserAdded_itemsTablePage />}
          ></Route>
          <Route
            path="/user/add-inventory_protection"
            element={<AddUserInventory_protectionTablePage />}
          ></Route>
          <Route
            path="/user/edit-inventory_protection/:id"
            element={<EditUserInventory_protectionTablePage />}
          ></Route>
          <Route
            path="/user/view-inventory_protection/:id"
            element={<ViewUserInventory_protectionTablePage />}
          ></Route>
          <Route
            path="/user/inventory_protection"
            element={<ListUserInventory_protectionTablePage />}
          ></Route>
          <Route path="/user/profile" element={<UserProfile />}></Route>
        </Routes>
      );

    default:
      return (
        <Routes>
          <Route exact path="/admin/login" element={<AdminLoginPage />}></Route>
          <Route
            exact
            path="/admin/forgot"
            element={<AdminForgotPage />}
          ></Route>
          <Route exact path="/admin/reset" element={<AdminResetPage />}></Route>
          <Route path="*" exact element={<NotFoundPage />}></Route>
          <Route
            path="/login/oauth"
            element={<SocialLoginVerfication />}
          ></Route>
          <Route path="/magic-login" element={<UserMagicLoginPage />}></Route>
          <Route
            path="/magic-login/verify"
            element={<MagicLoginVerifyPage />}
          ></Route>
          <Route path="/user/login" element={<UserLoginPage2 />}></Route>
          <Route path="/user/sign-in" element={<UserLoginPage />}></Route>
          <Route path="/user/sign-up" element={<UserSignUpPage />}></Route>
          <Route path="/user/forgot" element={<UserForgotPage />}></Route>
          <Route path="/user/reset" element={<UserResetPage />}></Route>
          // Route /login/oauth
          <Route
            path="/login/oauth"
            element={<SocialLoginVerificationTemplate />}
          ></Route>
        </Routes>
      );
  }
}
function Main() {
  const { state } = React.useContext(AuthContext);

  return (
    <div className="h-full">
      <div className="flex w-full">
        {/*!state.isAuthenticated ? <PublicHeader /> : renderHeader(state.role)*/}
        {renderHeader('user')}
        <div className="w-full">
          {state.isAuthenticated ? renderTop(state.role) : null}
          <div
            className={`page-wrapper w-full ${
              state.isAuthenticated ? "p-5" : ""
            }`}
          >
            {!state.isAuthenticated
              ? renderRoutes("user"/*"none"*/)
              : renderRoutes(state.role)}
          </div>
        </div>
      </div>
      <SessionExpiredModal />
      <SnackBar />
    </div>
  );
}

export default Main;
