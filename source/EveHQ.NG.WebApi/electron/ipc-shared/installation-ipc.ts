export class InstallationIpc {
	public static get isApplicationInstalled(): string {
		return this.getChannelFor('isApplicationInstalled');
	}

	public static get getApplicationConfiguration(): string {
		return this.getChannelFor('getApplicationConfiguration');
	}

	public static get setApplicationConfiguration(): string {
		return this.getChannelFor('setApplicationConfiguration');
	}

	public static get getSsoConfiguration(): string {
		return this.getChannelFor('getSsoConfiguration');
	}

	public static get setSsoConfiguration(): string {
		return this.getChannelFor('setSsoConfiguration');
	}

	private static getChannelFor(message: string): string {
		return `InstallationService.${message}`;
	}
}
