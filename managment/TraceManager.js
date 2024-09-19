class TraceManager{
    traces = {}

    addTrace(requestId, responseId){
        this.#ensureTrace(requestId);
        this.traces[requestId].push(responseId);
    }

    removeTrace(requestId){
        delete this.traces[requestId];
    }

    #ensureTrace(requestId){
        if(this.traces[requestId] === undefined){
            this.traces[requestId] = []
        }
    }
}

export default new TraceManager();