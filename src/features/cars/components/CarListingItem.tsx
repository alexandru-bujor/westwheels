'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Car } from '@/types/car';
import styles from './CarListingItem.module.css';

interface Props {
    car: Car;
}

export function CarListingItem({ car }: Props) {
    const router = useRouter();
    const [imgIndex, setImgIndex] = useState(0);

    const images =
        car.images?.length
            ? car.images
            : ['https://images.unsplash.com/photo-1606664515524-ed2f786a0ad6?w=600'];

    const formatPrice = (v: number) =>
        new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
        }).format(v);

    return (
        <div
            className={`box item-box ${styles.card}`}
            onClick={() => router.push(`/en/car/${car.id}`)}
        >
            {/* IMAGE */}
            <div className={styles.imageWrap}>
                <div className={styles.gallery}>
                    <div className={styles.carouselProduct}>
                        {images.length > 1 && (
                            <ol className={styles.carouselIndicators}>
                                {images.map((_, idx) => (
                                    <li
                                        key={idx}
                                        className={idx === imgIndex ? styles.active : ''}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setImgIndex(idx);
                                        }}
                                    />
                                ))}
                            </ol>
                        )}

                        <div className={styles.carouselInner}>
                            {images.map((img, idx) => (
                                <img
                                    key={idx}
                                    src={img}
                                    alt={`${car.make} ${car.model} photo no. ${idx + 1}`}
                                    className={`${styles.carouselItem} ${styles.carouselHome} ${idx === imgIndex ? styles.active : ''}`}
                                    loading={idx === 0 ? 'lazy' : undefined}
                                />
                            ))}
                        </div>

                        {images.length > 1 && (
                            <>
                                <a
                                    className={`${styles.carouselControl} ${styles.carouselControlPrev}`}
                                    href="#"
                                    role="button"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setImgIndex((i) => (i - 1 + images.length) % images.length);
                                    }}
                                >
                                    <img src="https://bid.cars/img/arrow-left.svg" width="10" height="15" className={styles.runSvg} alt="Previous photo" />
                                </a>
                                <a
                                    className={`${styles.carouselControl} ${styles.carouselControlNext}`}
                                    href="#"
                                    role="button"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setImgIndex((i) => (i + 1) % images.length);
                                    }}
                                >
                                    <img src="https://bid.cars/img/arrow-right.svg" width="10" height="15" className={styles.runSvg} alt="Next photo" />
                                </a>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* CAR INFO SECTION - Single Row with Label-Value Pairs */}
            <div className={styles.carInfoSection}>
                <div className={styles.infoRow}>
                    <div className={styles.infoLabel}>Location:</div>
                    <div className={styles.infoValue}>{car.location || 'N/A'}</div>
                    
                    <div className={styles.infoLabel}>Shipping from:</div>
                    <div className={styles.infoValue}>{car.shippingFrom || 'N/A'}</div>
                    
                    {car.distance && (
                        <>
                            <div className={styles.infoLabel}>Odległość:</div>
                            <div className={styles.infoValue}>{car.distance}</div>
                        </>
                    )}
                    
                    <div className={styles.infoLabel}>Estimated cost:</div>
                    <div className={styles.infoValue}>
                        {car.estimatedCost ? (
                            <span className={styles.estimatedCost}>{car.estimatedCost}</span>
                        ) : (
                            'No information'
                        )}
                    </div>
                </div>
            </div>

            {/* BOTTOM WRAPPER */}
            <div className={styles.bottomWr}>
                {/* TIMER */}
                <div className={styles.itemTime}>
                    <img src="https://bid.cars/images/timer.svg" width="20" height="20" alt="Time left" />
                    <span className={styles.indicator}></span>
                    <span data-countdown-bn={`${car.auctionDate} ${car.auctionTime || '00:00:00'}`} style={{ marginLeft: '5px' }}>
                        1d 4h 29m 53s
                    </span>
                </div>

                {/* PRICES */}
                {car.fastBuyPrice ? (
                    <div className={`${styles.priceBox} ${styles.buyNow}`}>
                        <div className={styles.priceLabel}>
                            <span className={styles.mobileHide}>Current Bid:</span>
                            <span className={styles.desktopHide}>Current:</span>
                        </div>
                        <div className={styles.priceLabel}>
                            <span className={styles.mobileHide}>Buy Now:</span>
                            <span className={styles.desktopHide}>Buy Now:</span>
                        </div>
                        <div className={styles.priceValue}>{formatPrice(car.currentBid)}</div>
                        <div className={`${styles.priceValue} ${styles.buyNowPrice}`}>{formatPrice(car.fastBuyPrice)}</div>
                    </div>
                ) : (
                    <div className={`${styles.priceBox} ${styles.current}`}>
                        <span>Current Bid:</span> {formatPrice(car.currentBid)}
                    </div>
                )}
            </div>
        </div>
    );
}
