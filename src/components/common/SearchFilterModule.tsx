'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import './searchFilterModule.css';

/* ================= DATA / JSON ================= */
const VEHICLE_TYPES = [
    { id: 'automobile', label: 'Automobile', icon: 'https://bid.cars/img/upd/auto.svg' },
    { id: 'motorcycle', label: 'Motorcycle', icon: 'https://bid.cars/img/upd/motor.svg' },
    { id: 'atv', label: 'ATV', icon: 'https://bid.cars/img/upd/atv.svg' },
    { id: 'more', label: 'More', icon: 'https://bid.cars/img/upd/more.svg', showMore: true },
];

const MORE_VEHICLE_TYPES = [
    { id: 'personal-watercraft', label: 'Personal Watercraft' },
    { id: 'snowmobile', label: 'Snowmobile' },
    { id: 'boat', label: 'Boat' },
    { id: 'trailer', label: 'Trailer' },
    { id: 'travel-trailer', label: 'Travel Trailer' },
    { id: 'motor-home', label: 'Motor Home' },
    { id: 'emergency-equipment', label: 'Emergency Equipment' },
    { id: 'heavy-equipment', label: 'Heavy Equipment' },
    { id: 'farm-equipment', label: 'Farm Equipment' },
    { id: 'forestry-equipment', label: 'Forestry Equipment' },
    { id: 'bus', label: 'Bus' },
    { id: 'truck', label: 'Truck' },
];

const MAKES = [
    "All makes","Acura","Alfa Romeo","Aston Martin","Audi","Bentley","BMW","Buick","Cadillac",
    "Chevrolet","Chrysler","Dodge","Ferrari","Fiat","Ford","Genesis","GMC","Honda","Hummer",
    "Hyundai","Infiniti","Jaguar","Jeep","KIA","Lamborghini","Land Rover","Lexus","Lincoln",
    "Maserati","Mazda","Mercedes-Benz","Mercury","Mini","Mitsubishi","Nissan","Porsche","RAM",
    "Rolls-Royce","Subaru","Tesla","Toyota","Volkswagen","Volvo","Other"
];

const MODELS = ["All models","Mustang","Camaro","Challenger"];

const YEARS = Array.from({ length: 128 }, (_, i) => 2027 - i);

const PRICE_RANGES = [
    '', '0', '1000', '5000', '10000', '15000', '20000', '25000', '30000', 
    '40000', '50000', '75000', '100000', '150000', '200000', '300000', '500000'
];

const MILEAGE_RANGES = [
    '', '0', '5000', '10000', '25000', '50000', '75000', '100000', 
    '125000', '150000', '200000', '250000', '300000'
];

const CONDITIONS = [
    'All', 'Run and Drive', 'Enhanced Vehicles', 'No Keys', 'Start Code', 
    'Starts', 'Enhanced', 'No Start', 'Unknown'
];

const DAMAGE_TYPES = [
    'All', 'All Over', 'Burn', 'Hail', 'Mechanical', 'Minor Dents/Scratches',
    'Normal Wear', 'Partial Repair', 'Rear End', 'Rollover', 'Side', 
    'Top/Roof', 'Undercarriage', 'Vandalism', 'Water/Flood', 'Front End'
];

const LOCATIONS = [
    'All', 'Alabama', 'Arizona', 'Arkansas', 'California', 'Colorado', 
    'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Illinois', 'Indiana',
    'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maryland', 'Massachusetts',
    'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Nebraska', 'Nevada',
    'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'Ohio', 'Oklahoma',
    'Oregon', 'Pennsylvania', 'South Carolina', 'Tennessee', 'Texas', 'Utah',
    'Virginia', 'Washington', 'Wisconsin', 'Wyoming'
];

// Combine vehicle types, removing duplicates by id
const ALL_VEHICLE_TYPES = [
    ...VEHICLE_TYPES.filter(v => v.id !== 'more'),
    ...MORE_VEHICLE_TYPES.filter(v => !VEHICLE_TYPES.some(vt => vt.id === v.id))
];

/* ================= COMPONENT ================= */
export function SearchFilterModule() {
    const router = useRouter();
  const [selectedVehicleType, setSelectedVehicleType] = useState('automobile');
  const [showArchived, setShowArchived] = useState(false);
    const [showMoreDropdown, setShowMoreDropdown] = useState(false);
  const [copartSelected, setCopartSelected] = useState(true);
  const [iaaiSelected, setIaaiselected] = useState(true);
    const [make, setMake] = useState('All makes');
    const [model, setModel] = useState('All models');
    const [generation, setGeneration] = useState('All generations');
    const [yearFrom, setYearFrom] = useState('');
    const [yearTo, setYearTo] = useState('');
    const [vinLotSearch, setVinLotSearch] = useState('');
    const [priceFrom, setPriceFrom] = useState('');
    const [priceTo, setPriceTo] = useState('');
    const [mileageFrom, setMileageFrom] = useState('');
    const [mileageTo, setMileageTo] = useState('');
    const [condition, setCondition] = useState('All');
    const [damageType, setDamageType] = useState('All');
    const [location, setLocation] = useState('All');
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  return (
        <div className="search-filter-wrapper">
      <div className="form-search-main">
                {/* Top Vehicle Type Options */}
                <div className="top-options main-types">
                    <ul>
                        {VEHICLE_TYPES.map((type) => {
            const isActive = selectedVehicleType === type.id;
            return (
                                <li
                key={type.id}
                                    className={isActive ? 'active' : ''}
                                    data-type={type.id}
                                    onClick={() => {
                                        if (type.showMore) {
                                            setShowMoreDropdown(!showMoreDropdown);
                                        } else {
                                            setSelectedVehicleType(type.id);
                                            setShowMoreDropdown(false);
                                        }
                                    }}
                                >
                                    <button>
                                        {type.icon && <img src={type.icon} width="24" height="24" alt={type.label} />}
                                        {type.label}
              </button>
                                </li>
            );
          })}
                    </ul>

                    {/* Archived toggle on the right */}
                    <label className="switch switch-archieved">
                        <div className="switch-toggle">
                            <input
                                id="archived"
                                type="checkbox"
                                name="archived"
                                checked={showArchived}
                                onChange={(e) => setShowArchived(e.target.checked)}
                            />
                            <span className="slider round"></span>
        </div>
                        <span className="label">Archived</span>
                    </label>

                    {/* Dropdown for More */}
                    <div className={`dropdown-psa-new ${showMoreDropdown ? 'show' : ''}`}>
                        <ul>
                            {MORE_VEHICLE_TYPES.map((type) => (
                                <li
                                    key={type.id}
                                    data-type={type.id}
                                    className={type.id === 'atv' ? 'hidden' : ''}
                                    onClick={() => {
                                        setSelectedVehicleType(type.id);
                                        setShowMoreDropdown(false);
                                    }}
                                >
                                    <button>{type.label}</button>
                                </li>
                            ))}
                        </ul>
            </div>
          </div>

                {/* Search Form */}
                <div className="search-wrapper">
                    <form className="new-search-psa" action="#">
                        {/* Vehicle type radio buttons hidden */}
                        <div className="nav nav-hidden-filter">
                            {ALL_VEHICLE_TYPES.map((type) => (
                                <label key={type.id}>
                                    {type.label}
                                    <input
                                        type="radio"
                                        checked={selectedVehicleType === type.id}
                                        onChange={() => setSelectedVehicleType(type.id)}
                                        name="vehicle-type"
                                        value={type.id}
                                    />
            </label>
                            ))}
            </div>

                        {/* Section title */}
                        <div className="section_title archieved-wr">
                            <p>What are you looking for?</p>
          </div>

                        {/* Main Search Fields */}
                        <div className="form-grid">
                            <div className="side">
                                <label className="form-cols">
                                    <select name="make" value={make} onChange={(e) => setMake(e.target.value)}>
                                        {MAKES.map((m) => (
                                            <option key={m} value={m}>{m}</option>
                                        ))}
                                    </select>
                                </label>

                                <label className="form-cols">
                                    <select
                                        name="model"
                                        value={model}
                                        onChange={(e) => setModel(e.target.value)}
                                        disabled={make === 'All makes'}
                                    >
                                        {MODELS.map((m) => (
                                            <option key={m} value={m}>{m}</option>
                                        ))}
                                    </select>
                                </label>

                                <label className="form-cols">
                                    <select
                                        name="generation"
                                        value={generation}
                                        onChange={(e) => setGeneration(e.target.value)}
                                    >
                                        <option value="All generations">All generations</option>
                                    </select>
                                </label>

                                <div className="years-wrapper">
                                    <label className="form-cols">
                                        <select
                                            name="from"
                                            value={yearFrom}
                                            onChange={(e) => setYearFrom(e.target.value)}
                                        >
                                            <option value="">From</option>
                                            {YEARS.map((y) => (
                                                <option key={y} value={y}>{y}</option>
                                            ))}
                                        </select>
                                    </label>

                                    <label className="form-cols">
                                        <select
                                            name="to"
                                            value={yearTo}
                                            onChange={(e) => setYearTo(e.target.value)}
                                        >
                                            <option value="">To</option>
                                            {YEARS.map((y) => (
                                                <option key={y} value={y}>{y}</option>
                                            ))}
                                        </select>
            </label>
                                </div>

                                {/* Advanced Filters Toggle */}
                                <div className="advanced-filters-toggle">
                                    <button
                                        type="button"
                                        className="toggle-advanced-btn"
                                        onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                                    >
                                        <span>{showAdvancedFilters ? 'Hide' : 'Show'} Advanced Filters</span>
                                        <svg 
                                            width="12" 
                                            height="12" 
                                            viewBox="0 0 12 12" 
                                            fill="none"
                                            style={{ 
                                                transform: showAdvancedFilters ? 'rotate(180deg)' : 'rotate(0deg)',
                                                transition: 'transform 0.3s ease'
                                            }}
                                        >
                                            <path d="M6 9L1 4h10L6 9z" fill="currentColor"/>
                                        </svg>
                                    </button>
            </div>

                                {/* Advanced Filters Section */}
                                {showAdvancedFilters && (
                                    <div className="advanced-filters-section">
                                        <div className="section_title">
                                            <p>Additional Filters</p>
          </div>

                                        {/* Price Range */}
                                        <div className="filter-group">
                                            <label className="filter-label">Price Range (USD)</label>
                                            <div className="range-wrapper">
                                                <label className="form-cols">
                                                    <select
                                                        name="price-from"
                                                        value={priceFrom}
                                                        onChange={(e) => setPriceFrom(e.target.value)}
                                                    >
                                                        <option value="">Min Price</option>
                                                        {PRICE_RANGES.map((p) => (
                                                            <option key={p} value={p}>
                                                                {p === '' ? 'Min' : `$${parseInt(p).toLocaleString()}`}
                                                            </option>
                                                        ))}
                                                    </select>
            </label>
                                                <label className="form-cols">
                                                    <select
                                                        name="price-to"
                                                        value={priceTo}
                                                        onChange={(e) => setPriceTo(e.target.value)}
                                                    >
                                                        <option value="">Max Price</option>
                                                        {PRICE_RANGES.map((p) => (
                                                            <option key={p} value={p}>
                                                                {p === '' ? 'Max' : `$${parseInt(p).toLocaleString()}`}
                                                            </option>
                                                        ))}
              </select>
                                                </label>
            </div>
          </div>

                                        {/* Mileage Range */}
                                        <div className="filter-group">
                                            <label className="filter-label">Mileage Range</label>
                                            <div className="range-wrapper">
                                                <label className="form-cols">
                                                    <select
                                                        name="mileage-from"
                                                        value={mileageFrom}
                                                        onChange={(e) => setMileageFrom(e.target.value)}
                                                    >
                                                        <option value="">Min Mileage</option>
                                                        {MILEAGE_RANGES.map((m) => (
                                                            <option key={m} value={m}>
                                                                {m === '' ? 'Min' : `${parseInt(m).toLocaleString()} mi`}
                                                            </option>
                                                        ))}
                                                    </select>
            </label>
                                                <label className="form-cols">
                                                    <select
                                                        name="mileage-to"
                                                        value={mileageTo}
                                                        onChange={(e) => setMileageTo(e.target.value)}
                                                    >
                                                        <option value="">Max Mileage</option>
                                                        {MILEAGE_RANGES.map((m) => (
                                                            <option key={m} value={m}>
                                                                {m === '' ? 'Max' : `${parseInt(m).toLocaleString()} mi`}
                                                            </option>
                                                        ))}
              </select>
                                                </label>
            </div>
          </div>

                                        {/* Condition and Damage Type */}
                                        <div className="filter-group-row">
                                            <label className="form-cols">
                                                <span className="filter-label-text">Condition</span>
                                                <select
                                                    name="condition"
                                                    value={condition}
                                                    onChange={(e) => setCondition(e.target.value)}
                                                >
                                                    {CONDITIONS.map((c) => (
                                                        <option key={c} value={c}>{c}</option>
                                                    ))}
                                                </select>
                                            </label>

                                            <label className="form-cols">
                                                <span className="filter-label-text">Damage Type</span>
                                                <select
                                                    name="damage-type"
                                                    value={damageType}
                                                    onChange={(e) => setDamageType(e.target.value)}
                                                >
                                                    {DAMAGE_TYPES.map((d) => (
                                                        <option key={d} value={d}>{d}</option>
                                                    ))}
                                                </select>
            </label>
                                        </div>

                                        {/* Location */}
                                        <div className="filter-group">
                                            <label className="form-cols">
                                                <span className="filter-label-text">Location</span>
                                                <select
                                                    name="location"
                                                    value={location}
                                                    onChange={(e) => setLocation(e.target.value)}
                                                >
                                                    {LOCATIONS.map((l) => (
                                                        <option key={l} value={l}>{l}</option>
                                                    ))}
              </select>
                                            </label>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Search by VIN/Lot */}
                            <div className="side">
                                <div className="section_title second" style={{ width: '100%' }}>
                                    <p>or</p>
            </div>
          </div>

                            <div className="side">
                                <div className="form form_1col" style={{ width: '100%' }}>
                                    <input
                                        id="search"
                                        placeholder="Search by VIN or lot number"
                                        value={vinLotSearch}
                                        onChange={(e) => setVinLotSearch(e.target.value)}
                                    />
                                    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M18.9429 17.6343L12.7751 11.4665C13.7322 10.2291 14.2499 8.71621 14.2499 7.12497C14.2499 5.22023 13.5066 3.43424 12.1623 2.08762C10.8181 0.740997 9.02734 0 7.12497 0C5.2226 0 3.43186 0.743372 2.08762 2.08762C0.740997 3.43186 0 5.22023 0 7.12497C0 9.02734 0.743372 10.8181 2.08762 12.1623C3.43186 13.5089 5.22023 14.2499 7.12497 14.2499C8.71621 14.2499 10.2267 13.7322 11.4641 12.7774L17.6319 18.9429C17.65 18.961 17.6715 18.9754 17.6951 18.9852C17.7188 18.995 17.7441 19 17.7697 19C17.7953 19 17.8206 18.995 17.8442 18.9852C17.8679 18.9754 17.8893 18.961 17.9074 18.9429L18.9429 17.9098C18.961 17.8917 18.9754 17.8702 18.9852 17.8466C18.995 17.823 19 17.7976 19 17.772C19 17.7465 18.995 17.7211 18.9852 17.6975C18.9754 17.6739 18.961 17.6524 18.9429 17.6343V17.6343ZM10.887 10.887C9.87996 11.8916 8.54521 12.4449 7.12497 12.4449C5.70473 12.4449 4.36998 11.8916 3.36299 10.887C2.35836 9.87996 1.80499 8.54521 1.80499 7.12497C1.80499 5.70473 2.35836 4.36761 3.36299 3.36299C4.36998 2.35836 5.70473 1.80499 7.12497 1.80499C8.54521 1.80499 9.88233 2.35599 10.887 3.36299C11.8916 4.36998 12.4449 5.70473 12.4449 7.12497C12.4449 8.54521 11.8916 9.88233 10.887 10.887Z"
                                            fill="white"
                                        ></path>
                                    </svg>
        </div>

                                {/* Copart / IAAI Checkboxes and Show button */}
                                <div className="footer-buttons" style={{ width: '100%' }}>
                                    <div className="col-left">
                                        <label className="switch switch-copart">
                                            <div className="switch-toggle">
                                                <input
                                                    type="checkbox"
                                                    checked={copartSelected}
                                                    onChange={(e) => setCopartSelected(e.target.checked)}
                                                />
                                                <span className="slider round"></span>
                                            </div>
                                            <span className="label">Copart</span>
                                        </label>

                                        <label className="switch switch-iaai">
                                            <div className="switch-toggle">
                                                <input
                                                    type="checkbox"
                                                    checked={iaaiSelected}
                                                    onChange={(e) => setIaaiselected(e.target.checked)}
                                                />
                                                <span className="slider round"></span>
                                            </div>
                                            <span className="label">IAAI</span>
                                        </label>
          </div>

                                    <div className="col-right">
            <button
                                            className="btn btn-big show-result-btn"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                const params = new URLSearchParams({
                                                    'search-type': 'filters',
                                                    status: showArchived ? 'Archived' : 'All',
                                                    type: selectedVehicleType,
                                                    make,
                                                    model,
                                                    'year-from': yearFrom || '1900',
                                                    'year-to': yearTo || '2027',
                                                    'price-from': priceFrom || '',
                                                    'price-to': priceTo || '',
                                                    'mileage-from': mileageFrom || '',
                                                    'mileage-to': mileageTo || '',
                                                    condition: condition !== 'All' ? condition : '',
                                                    'damage-type': damageType !== 'All' ? damageType : '',
                                                    location: location !== 'All' ? location : '',
                                                    'auction-type': 'All',
                                                    copart: copartSelected ? 'true' : 'false',
                                                    iaai: iaaiSelected ? 'true' : 'false',
                                                });
                                                router.push(`/en/search/results?${params.toString()}`);
                                            }}
                                        >
                                            Show 108 300 vehicles
            </button>
          </div>
        </div>
                            </div>
                        </div>
                    </form>
                </div>
      </div>
    </div>
  );
}
