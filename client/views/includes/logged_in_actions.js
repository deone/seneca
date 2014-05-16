Template._loginButtonsLoggedInDropdown.events({
  'click #login-buttons-edit-profile': function(event) {
    event.stopPropagation();
    Template._loginButtons.toggleDropdown();
    Router.go('profileEdit');
  },
  'click #login-buttons-settings': function(event) {
    event.stopPropagation();
    Template._loginButtons.toggleDropdown();
    Router.go('settings');
  }
});
