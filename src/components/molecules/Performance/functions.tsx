

import { DisplayMode } from '../../../common/interfaces/@msft/1.15.2/displayMode';
import { IPerformanceOp, ILoadPerformanceSS7, ILoadPerformanceALVFM, ILoadPerformance, IPerformanceOpWithDetails } from './IPerformance';

export function createBasePerformanceInit( editMode: DisplayMode, monitor:  boolean ) : ILoadPerformance{

    const loadPerformance: ILoadPerformance = {
        onInit:  new Date(),
        constructor: null as any,

        sets: { },
        ops: {
          fetch:  null as any,
          analyze:  null as any,
        },

        monitor: monitor as any,
        history: [],

        mode: editMode,

    };

    return loadPerformance;

}

export function startPerformanceInit_ALVFM( editMode: DisplayMode, monitor:  boolean ) : ILoadPerformanceALVFM {

    const loadPerformance : ILoadPerformanceALVFM = createBasePerformanceInit( editMode, monitor ) as ILoadPerformanceALVFM;

    return loadPerformance;

}

export function startPerformanceInit_SS7( classic:  boolean, modern:  boolean, reload:  boolean, editMode: DisplayMode, monitor:  boolean ) : ILoadPerformanceSS7 {

    const loadPerformance : ILoadPerformanceSS7 = createBasePerformanceInit( editMode, monitor ) as ILoadPerformanceSS7;

    loadPerformance.spPageContextInfoClassic = classic;
    loadPerformance.spPageContextInfoModern = modern;
    loadPerformance.forceReloadScripts = reload;
    loadPerformance.jsEval = null as any;

    return loadPerformance;

}

/**
 * 
 * @param label 
 * @param editMode 
 * @param includeMsStr - Add time MS to startStr so that it is easier to verify timing.  https://github.com/mikezimm/pivottiles7/issues/192
 * @returns 
 */
export function startPerformOp ( label: string, editMode: DisplayMode | null, includeMsStr: boolean = false ) {
    const start = new Date();
    const startStr: string = includeMsStr === true ? `${start.toLocaleTimeString()} : ${start.getMilliseconds()}` : start.toLocaleTimeString();
    const result: IPerformanceOp = {
        label: label,
        start: start,
        startStr: startStr,
        mode: editMode,
        details: [],//Could be used to trace individual file loads
    };

    return result;
}

export function updatePerformanceEnd( op: IPerformanceOp, updateMiliseconds:  boolean, count: number | null ) {
    op.end = new Date();
    op.endStr = op.end.toLocaleTimeString();
    if ( updateMiliseconds === true ) op.ms = op.end.getTime() - op.start.getTime();
    if ( count !== null && count > 0 && op.ms ) {
      op.c = count;
      op.a = Math.round( ( op.ms / count ) *10 ) / 10;
    }
    return op;
}

export function updatePerformOpSimple ( ops: IPerformanceOp[], count: number | null ) {

    if ( ops.length > 0 ) {
        const last = ops.length -1;
        ops[last] = updatePerformanceEnd( ops[last], true, count );
    }
    return ops;
}

export function startPerformOpDetail ( ops: IPerformanceOpWithDetails[], label: string, editMode: DisplayMode, update: boolean = true, count: number | null = null ) {
    if ( ops ) {

        const last: number = ops.length -1;

        if ( update === true && ops.length > 0 ) {
            ops[last] = updatePerformanceEnd( ops[last], update, count );
        }
    
        if ( label && ops[ last ]) {
            if ( typeof ops[ last ].details === 'object' ) {
                ops[ last ].details.push( startPerformOp( label, editMode ) );
            }

        } else { console.log( `IPerformance ERROR: startPerformOpDetail label: ${ label } ; last: ${ last }`)}
    }

    return ops;
}