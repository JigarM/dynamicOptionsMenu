#Dynamic OptionsMenu

This is a sample project to demonstrate the usage of menus in Android with Titanium.

##the problem
Titanium does not support Fragments. Otherwise, it would be possible to define seperate Menus for each Fragment. When you work with TabGroups, you only have one single Activity to create an OptionsMenu. But what you actually want, is tab-dependend menus.

##the solution
* define a tab-depended menu within a function
* add an open-Listener to the Tabgroup
* in the event-callback, define:
	* onCreateOptionsMenu -> call your function from step 1
	* onPrepareOptionsMenu (only for API-Level < 11)
* add a focus-Listener to the Tabgroup
* call activity.invalidateOptionsMenu(); each time the tabGroup gets focus (only when API-Level is >= 11)


![Screenshot 1](https://raw.github.com/manumaticx/dynamicOptionsMenu/master/images/android4X.png)

![Screenshot 1](https://raw.github.com/manumaticx/dynamicOptionsMenu/master/images/android2X.png)
