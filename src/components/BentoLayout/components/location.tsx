"use client";

import { useTheme } from "next-themes";
import { useCallback, useMemo, useRef, useState } from "react";
import type { MapRef } from "react-map-gl";
import Map from "react-map-gl";
import { debounce } from "perfect-debounce";
import Button from "~/components/Button";
import Card from "~/components/Card";

const MAX_ZOOM = 12;
const MIN_ZOOM = 4;
const INITIAL_VIEW_STATE = {
  latitude: 26.075, // 福州市纬度
  longitude: 119.292, // 福州市经度
  zoom: MAX_ZOOM,
};

const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

export default function Location() {
  const [currentZoom, setCurrentZoom] = useState<number>(MAX_ZOOM);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const mapRef = useRef<MapRef>(null);
  const { theme } = useTheme();

  const mapStyle = useMemo(() =>
            `mapbox://styles/mapbox/${theme === "dark" ? "dark-v11" : "streets-v12"}`, [theme]);

  const handleZoom = useCallback(debounce((zoomIn: boolean) => {
    if (mapRef.current) {
      const currentZoom = mapRef.current.getZoom();
      setCurrentZoom(prevZoom => prevZoom + (zoomIn ? 1 : -1));
      if ((zoomIn && currentZoom < MAX_ZOOM) || (!zoomIn && currentZoom > MIN_ZOOM)) {
        zoomIn ? mapRef.current.zoomIn() : mapRef.current.zoomOut();
      }
    }
  }, 300), []);

  const renderZoomControls = () => (
    <div className="absolute inset-x-3 bottom-3 flex items-center justify-between">
      <Button
        className={currentZoom === MIN_ZOOM ? "invisible" : "cancel-drag"}
        aria-label="缩小"
        type="button"
        onClick={() => handleZoom(false)}
      >
        <svg className="i-tabler:minus"></svg>
      </Button>
      <Button
        className={currentZoom === MAX_ZOOM ? "invisible" : "cancel-drag"}
        aria-label="放大"
        type="button"
        onClick={() => handleZoom(true)}
      >
        <svg className="i-tabler:plus"></svg>
      </Button>
    </div>
  );

  return (
    <Card className="relative size-full cancel-drag">
      {mapboxToken
        ? (
            <Map
              mapboxAccessToken={mapboxToken}
              mapStyle={mapStyle}
              ref={mapRef}
              scrollZoom={true}
              dragPan={true}
              doubleClickZoom={false}
              attributionControl={false}
              dragRotate={false}
              pitchWithRotate={false}
              touchZoomRotate={false}
              antialias={true}
              onLoad={() => setIsMapLoaded(true)}
              initialViewState={INITIAL_VIEW_STATE}
              maxZoom={MAX_ZOOM}
              minZoom={MIN_ZOOM}
            >
              {isMapLoaded && renderZoomControls()}
            </Map>
          )
        : (
            <div>错误：缺少 Mapbox token</div>
          )}
    </Card>
  );
}
