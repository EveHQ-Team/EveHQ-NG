import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'roman'
})
export class RomanNumberPipe implements PipeTransform {

	public transform(value: number): string {
		switch (value) {
			case 1:
				return 'I';
			case 2:
				return 'II';
			case 3:
				return 'III';
			case 4:
				return 'IV';
			case 5:
				return 'V';
			default:
				return '--unsupported--';
		}
	}
}
