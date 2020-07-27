import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DataService, FacetWithValues } from '@vendure/admin-ui/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import { FormInputComponent, InputComponentConfig } from '../../../common/component-registry-types';

@Component({
    selector: 'vdr-facet-value-form-input',
    templateUrl: './facet-value-form-input.component.html',
    styleUrls: ['./facet-value-form-input.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FacetValueFormInputComponent implements FormInputComponent, OnInit {
    readonly isListInput = true;
    readonly: boolean;
    formControl: FormControl;
    facets$: Observable<FacetWithValues.Fragment[]>;
    config: InputComponentConfig;
    constructor(private dataService: DataService) {}

    ngOnInit() {
        this.facets$ = this.dataService.facet
            .getAllFacets()
            .mapSingle(data => data.facets.items)
            .pipe(shareReplay(1));
    }
}
