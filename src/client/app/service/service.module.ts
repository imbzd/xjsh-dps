import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MerchantService } from './merchant/index';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [],
  exports: [CommonModule, FormsModule, RouterModule]
})
export class ServiceModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CommonModule,
      providers: [MerchantService]
    };
  }
}
