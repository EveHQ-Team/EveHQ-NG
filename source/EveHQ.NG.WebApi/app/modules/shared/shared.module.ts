import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { SelectPathComponent } from 'modules/shared/select-path/select-path.component';
import { PortNumberSelectorComponent } from 'modules/shared/port-number-selector/port-number-selector.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		InputTextModule,
		ButtonModule,
		CardModule
	],
	declarations: [
		SelectPathComponent,
		PortNumberSelectorComponent
	],
	exports: [
		CommonModule,
		FormsModule,
		InputTextModule,
		ButtonModule,
		CardModule,
		SelectPathComponent,
		PortNumberSelectorComponent
	]
})
export class SharedModule {}
