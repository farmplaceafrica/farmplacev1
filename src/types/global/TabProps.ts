export type TabProps = {
	/**
	 * The routes to be displayed in the tab
	 * @type {Array}
	 * @required
	 * @example
	 * [
	 * {
	 * name: "Inventory",
	 * path: `/projects/${params.id}/inventory`,
	 * },
	 * {
	 * name: "Incoming Inventory",
	 * path: `/projects/${params.id}/incoming-inventory`,
	 * },
	 */
	routes: {
		name: string;
		path: string;
		isWider?: boolean;
	}[];
	/**
	 * The initial route to be displayed
	 * @type {Object}
	 * @required
	 * @example
	 * {
	 * name: "Inventory",
	 * path: `/projects/${params.id}/inventory`,
	 * }
	 */
	initialRoute: {
		name: string;
		value: string;
	};
};
