## 优先级

按照下列优先级进行翻译：

状态|URL|浏览量|占比
---|---|---|----
[x] |common/http/HttpClient | 7,263 | 2.26
[x] |common/NgForOf | 6,281 | 1.95
[x] |forms/NgModel | 5,648 | 1.75
[x] |core/Component | 5,582 | 1.73
[x] |common/NgIf | 4,940 | 1.53
[x] |core/NgModule | 4,097 | 1.27
[x] |router/Router | 4,049 | 1.26
[ ] |animations/animate | 3,817 | 1.19
[x] |common/NgClass | 3,715 | 1.15
[x] |common/DatePipe | 3,576 | 1.11
[x] |forms/FormsModule | 3,381 | 1.05
[x] |core/Input | 3,354 | 1.04
[x] |core/EventEmitter | 3,202 | 0.99
[x] |core/Injectable | 3,177 | 0.99
[x] |forms/FormGroup | 3,096 | 0.96
[x] |forms/FormControl | 3,034 | 0.94
[x] |router/ActivatedRoute | 2,993 | 0.93
[x] |forms/AbstractControl | 2,930 | 0.91
[x] |router/RouterLink | 2,929 | 0.91
[x] |core/ViewChild | 2,870 | 0.89
[x] |core/Directive | 2,767 | 0.86
[x] |router/Routes | 2,331 | 0.72
[x] |router/RouterModule | 2,227 | 0.69
[x] |router/Route | 2,223 | 0.69
[x] |common/http/HttpClientModule | 2,167 | 0.67
[x] |core/ElementRef | 2,163 | 0.67
[ ] |core/OnInit | 2,136 | 0.66
[ ] |common/UpperCasePipe | 2,078 | 0.65
[ ] |common/NgStyle | 1,935 | 0.60
[ ] |router/RouterOutlet | 1,908 | 0.59
[ ] |forms/Validators | 1,900 | 0.59
[ ] |common/http/HttpHeaders | 1,790 | 0.56
[x] |core/Pipe | 1,673 | 0.52
[ ] |common/NgSwitch | 1,670 | 0.52
[ ] |forms/NgForm | 1,597 | 0.50
[ ] |core/Renderer2 | 1,562 | 0.49
[x] |core/HostListener | 1,501 | 0.47
[ ] |common/AsyncPipe | 1,447 | 0.45
[ ] |core/ViewContainerRef | 1,367 | 0.42
[ ] |common/NgTemplateOutlet | 1,337 | 0.42
[ ] |common/Location | 1,306 | 0.41
[ ] |platform-browser/BrowserModule | 1,281 | 0.40
[ ] |common/DecimalPipe | 1,275 | 0.40
[ ] |common/CurrencyPipe | 1,260 | 0.39
[ ] |router/RouterLinkActive | 1,231 | 0.38
[ ] |core/TemplateRef | 1,212 | 0.38
[ ] |forms/FormBuilder | 1,205 | 0.37
[ ] |common/http/HttpParams | 1,131 | 0.35
[ ] |core/OnChanges | 1,116 | 0.35
[ ] |forms/FormControlName | 1,082 | 0.34
[x] |core/Output | 1,067 | 0.33
[ ] |common/http/HttpInterceptor | 968 | 0.30
[ ] |common/http/HttpRequest | 925 | 0.29
[ ] |router/CanActivate | 863 | 0.27
[ ] |router | 848 | 0.26
[ ] |animations/style | 804 | 0.25
[ ] |common/SlicePipe | 799 | 0.25
[ ] |router/Event | 796 | 0.25
[ ] |common/JsonPipe | 793 | 0.25
[x] |forms/FormArray | 792 | 0.25
[ ] |common/CommonModule | 787 | 0.24
[ ] |router/NavigationExtras | 776 | 0.24
[x] |core/HostBinding | 732 | 0.23
[x] |core/ContentChild | 719 | 0.22
[x] |core/ViewChildren | 717 | 0.22
[x] |common/http/HttpResponse | 714 | 0.22
[x] |router/ActivatedRouteSnapshot | 700 | 0.22
[ ] |common/http | 683 | 0.21
[ ] |core/ChangeDetectorRef | 670 | 0.21
[ ] |router/NavigationStart | 663 | 0.21
[ ] |common/formatDate | 662 | 0.21
[ ] |core/ComponentFactoryResolver | 638 | 0.20
[ ] |forms/Form | 635 | 0.20
[ ] |common/http/HttpErrorResponse | 629 | 0.20
[ ] |core/QueryList | 620 | 0.19
[ ] |forms | 618 | 0.19
[ ] |animations/state | 598 | 0.19
[ ] |common | 596 | 0.19
[ ] |router/LoadChildren | 593 | 0.18
[ ] |router/ParamMap | 588 | 0.18
[ ] |animations/trigger | 584 | 0.18
[ ] |router/RouterLinkWithHref | 584 | 0.18
[ ] |core/AfterViewInit | 579 | 0.18
[ ] |forms/ReactiveFormsModule | 576 | 0.18
[ ] |common/http/HTTP_INTERCEPTORS | 574 | 0.18
[ ] |platform-browser/DomSanitizer | 573 | 0.18
[ ] |core/PipeTransform | 572 | 0.18
[ ] |core/SimpleChange | 570 | 0.18
[ ] |core/SimpleChanges | 568 | 0.18
[ ] |forms/NgSelectOption | 560 | 0.17
[ ] |common/PercentPipe | 557 | 0.17
[ ] |forms/ValidatorFn | 557 | 0.17
[ ] |http/RequestOptionsArgs | 551 | 0.17
[ ] |animations/animation | 549 | 0.17
[ ] |common/NgSwitchCase | 521 | 0.16
[ ] |core/testing/async | 518 | 0.16

## 翻译方式

找到源码，并且把对应的 tsdoc 内容翻译了。

中文放在英文之后，并且要隔一个空行。

## 翻译内容

优先翻译函数主形态（如在 `common/http/src/client.ts` 中它通常都是重载形式中的最后一个），可以先不翻译各个重载形态。
