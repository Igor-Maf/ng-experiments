import { NgModule } from '@angular/core';
import { WidgetSettingsComponent } from './widget-settings.component';

@NgModule({
  declarations: [WidgetSettingsModule.rootComponent],
  entryComponents: [WidgetSettingsModule.rootComponent]
})
export class WidgetSettingsModule {
  static rootComponent = WidgetSettingsComponent;
}
