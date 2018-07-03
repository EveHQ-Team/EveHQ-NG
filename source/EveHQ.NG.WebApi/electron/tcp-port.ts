import * as net from 'net';

export class TcpPort {
	public async getRandomFreePort(
		minPortNumber: number = TcpPort.dynamicPortNumberRangeStart,
		maxPortNumber: number = TcpPort.dynamicPortNumberRangeEnd,
		hostAddress: string = TcpPort.localhost): Promise<number> {
		if (minPortNumber < TcpPort.minPortNumber || minPortNumber > TcpPort.maxPortNumber) {
			throw Error('Minimum port number should be between 1 and 65535.');
		}

		if (maxPortNumber < TcpPort.minPortNumber || maxPortNumber > TcpPort.maxPortNumber) {
			throw Error('Maximum port number should be between 1 and 65535.');
		}

		if (minPortNumber > maxPortNumber) {
			throw Error('Minimum port number must be less than or equal to maximum port number.');
		}

		const triesNumber = 100;
		for (let turn = 0; turn < triesNumber; turn++) {
			const portNumber = this.randomInteger(minPortNumber, maxPortNumber);
			const isPortFree = await this.isPortFree(portNumber, hostAddress);
			if (isPortFree) {
				return Promise.resolve(portNumber);
			}
		}

		return Promise.reject(`Couldn't find a free port number in ${triesNumber} tries.`);
	}

	public async isPortFree(portNumber: number, hostAddress: string = TcpPort.localhost): Promise<boolean> {
		return new Promise<boolean>((resolve, reject) => {
			const server = net.createServer((socket: net.Socket) => socket.write('echo\r\n'));
			server.listen(portNumber, hostAddress);
			server.on('error', () => resolve(false));
			server.on('listening',
				() => {
					server.close();
					resolve(true);
				});
		});
	}

	private randomInteger(min: number, max: number) {
		return Math.round(min - 0.5 + Math.random() * (max - min + 1));
	}

	private static readonly minPortNumber = 1;
	private static readonly maxPortNumber = 65535;
	private static readonly dynamicPortNumberRangeStart = 49152;
	private static readonly dynamicPortNumberRangeEnd = TcpPort.maxPortNumber;
	private static readonly localhost = '127.0.0.1';
}
