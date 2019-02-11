import {
  Directive,
  Inject,
  Injector,
  Input,
  NgModuleFactory,
  NgModuleFactoryLoader,
  NgModuleRef,
  OnDestroy,
  OnInit, Type,
  ViewContainerRef
} from '@angular/core';
import { InjectionToken } from '@angular/core';

interface LazyModules {
  widgetSettings: string;
}

const lazyMap: LazyModules = {
  widgetSettings: 'src/app/widget-settings/widget-settings.module#WidgetSettingsModule'
};

const LAZY_MODULES_MAP = new InjectionToken('LAZY_MODULES_MAP', {
  factory: () => lazyMap
});

type ModuleWithRoot = Type<any> & { rootComponent: Type<any> };

@Directive({
  selector: '[appLoadModule]'
})
export class LoadModuleDirective implements OnInit, OnDestroy {
  @Input('appLoadModule') moduleName: keyof LazyModules;
  private moduleRef: NgModuleRef<any>;

  constructor(
    private vcr: ViewContainerRef,
    private injector: Injector,
    private loader: NgModuleFactoryLoader,
    @Inject(LAZY_MODULES_MAP) private modulesMap
  ) { }

  ngOnInit() {
    this.loader
      .load(this.modulesMap[this.moduleName])
      .then((moduleFactory: NgModuleFactory<any>) => {
        this.moduleRef = moduleFactory.create(this.injector);
        const rootComponent = (moduleFactory.moduleType as ModuleWithRoot)
          .rootComponent;

        const factory = this.moduleRef.componentFactoryResolver.resolveComponentFactory(
          rootComponent
        );

        this.vcr.createComponent(factory);
      });
  }

  ngOnDestroy() {
    if (this.moduleRef) {
      this.moduleRef.destroy();
    }
  }
}
