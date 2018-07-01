export class InstallationIpc {
	public static get isApplicationInstalled(): string {
		return this.getChannelFor('isApplicationInstalled');
	}

	public static get getApplicationConfiguration(): string {
		return this.getChannelFor('getApplicationConfiguration');
	}

	private static getChannelFor(message: string): string {
		return `InstallationService.${message}`;
	}
}
