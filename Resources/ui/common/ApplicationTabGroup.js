/**
 * ApplicationTabGroup.js
 * for dynamic OptionsMenu
 * 
 * @author: Manuel Lehner
 * 
 * 
 */

function ApplicationTabGroup(Window) {
	//define some vars
	var apiLevel = Ti.Platform.Android.API_LEVEL,
		activity;
	
	//create module instance
	var self = Ti.UI.createTabGroup();	
	
	//create optionsMenu at 'open'-event of tabgroup
	self.addEventListener('open', function(){
		//get activity
		activity = self.getActivity();
		if (apiLevel >= 11){
			actionBar = activity.actionBar;
			actionBar.setIcon(null);
			actionBar.setTitle('Dynamic OptionsMenu');
		}else{
			activity.onPrepareOptionsMenu = function(e){
				createOptionsMenu(e);
			}
		}
		activity.onCreateOptionsMenu = function(e) {
	        createOptionsMenu(e);
	    }
	    activity.invalidateOptionsMenu();
	});
	
	self.addEventListener('focus', function(e){
		activity.invalidateOptionsMenu();
	});
	
	// create a tab-dependend OptionsMenu
	function createOptionsMenu(e){
		var menu = e.menu;
		menu.clear();
		
		// tab-dependend part
		switch(self.activeTab){
			case tab1:
				// all menuItems for Tab 1
				var menuItem_settings = menu.add({
					title: L('settings'),
					showAsAction : Ti.Android.SHOW_AS_ACTION_NEVER // this goes into overflow menu
				});
				menuItem_settings.addEventListener('click', function(){
					alert('clicked: Settings');
				});
				// now, let's create an action for this Tab
				// (it will appear in the usual Menu on older APIs)
				var menuItem_about = menu.add({
					title: L('about'),
					icon: 'images/action_about.png',
					showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS // this is shown as Action
				});
				menuItem_about.addEventListener('click', function(){
					alert('clicked: About');
				});
				break;
			case tab2:
				// all menuItems for Tab 2
				var menuItem_settings = menu.add({
					title: L('refresh'),
					showAsAction : Ti.Android.SHOW_AS_ACTION_NEVER // this goes into overflow menu
				});
				menuItem_settings.addEventListener('click', function(){
					alert('clicked: Refresh');
				});
				break;				
		}
		
		
		// Help Menu is for all Tabs
		var menuItem_help = menu.add({
			title: L('help'),
			showAsAction : Ti.Android.SHOW_AS_ACTION_NEVER
		});
        menuItem_help.addEventListener("click", function(e) {
            alert('clicked: Help');
        });
	};
	
	//create app tabs
	var win1 = new Window('Tab 1'),
		win2 = new Window('Tab 2');
	
	var tab1 = Ti.UI.createTab({
		title: 'Tab 1',
		window: win1
	});
	win1.containingTab = tab1;
	
	var tab2 = Ti.UI.createTab({
		title: 'Tab 2',
		window: win2
	});
	win2.containingTab = tab2;
	
	self.addTab(tab1);
	self.addTab(tab2);
	
	return self;
};

module.exports = ApplicationTabGroup;
