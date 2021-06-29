"use strict";
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectorMetricExporter = void 0;
const exporter_collector_1 = require("@opentelemetry/exporter-collector");
const types_1 = require("./types");
const CollectorExporterNodeBase_1 = require("./CollectorExporterNodeBase");
const core_1 = require("@opentelemetry/core");
const DEFAULT_COLLECTOR_URL = 'http://localhost:4317/v1/metrics';
/**
 * Collector Metric Exporter for Node with protobuf
 */
class CollectorMetricExporter extends CollectorExporterNodeBase_1.CollectorExporterNodeBase {
    constructor(config = {}) {
        super(config);
        // Converts time to nanoseconds
        this._startTime = new Date().getTime() * 1000000;
        core_1.getEnv().OTEL_EXPORTER_OTLP_METRICS_HEADERS = 'key1=value1'
        this.headers = Object.assign(this.headers, core_1.baggageUtils.parseKeyPairsIntoRecord(core_1.getEnv().OTEL_EXPORTER_OTLP_METRICS_HEADERS));
    }
    convert(metrics) {
        return exporter_collector_1.toCollectorExportMetricServiceRequest(metrics, this._startTime, this);
    }
    getDefaultUrl(config) {
        return typeof config.url === 'string'
            ? config.url
            : core_1.getEnv().OTEL_EXPORTER_OTLP_METRICS_ENDPOINT.length > 0
                ? core_1.getEnv().OTEL_EXPORTER_OTLP_METRICS_ENDPOINT
                : core_1.getEnv().OTEL_EXPORTER_OTLP_ENDPOINT.length > 0
                    ? core_1.getEnv().OTEL_EXPORTER_OTLP_ENDPOINT
                    : DEFAULT_COLLECTOR_URL;
    }
    getServiceClientType() {
        return types_1.ServiceClientType.METRICS;
    }
}
exports.CollectorMetricExporter = CollectorMetricExporter;
//# sourceMappingURL=CollectorMetricExporter.js.map