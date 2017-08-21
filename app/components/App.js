var React = require('react');
var Search = require('./Search');
var Map = require('./Map');
var CurrentLocation = require('./CurrentLocation');
var LocationList = require('./LocationList');


class App extends React.Component{
    constructor(props){
        super(props);
        var favorites = [];
        
        if(localStorage.favorites){
            favorites = JSON.parse(localStorage.favorites);
        }
        this.state = {
            favorites: favorites,
            currentAddress: 'Paris, France',
            mapCoordinates: {
                lat: 48.856614,
                lng: 2.3522219
            }
        }

        // bind all helper methods to instance of this
        this.toggleFavorite = this.toggleFavorite.bind(this);
        this.addToFavorites = this.addToFavorites.bind(this);
        this.removeFromFavorites = this.removeFromFavorites.bind(this);
        this.isAddressInFavorites = this.isAddressInFavorites.bind(this);
        this.searchForAddress = this.searchForAddress.bind(this);
    }

    toggleFavorite(address){
        if(this.isAddressInFavorites(address)){
            this.removeFromFavorites(address);
        } else {
            this.addToFavorites(address);
        }
    }

    addToFavorites(address){
        var favorites = this.state.favorites;
        favorites.push({
            address:address,
            timestamp: Date.now()
        });
        this.setState({
            favorites: favorites
        });
        localStorage.favorites = JSON.stringify(favorites);
    }

    removeFromFavorites(address){
        var favorites = this.state.favorites;
        var index = -1;

        for(let i = 0; i < favorites.length; i++){
            if(favorites[i].address === address){
                index = i;
                break;
            }
        }

        if(index !== -1){
            favorites.splice(index, 1);
            this.setState({
                favorites: favorites
            });
        }
        localStorage.favorites = JSON.stringify(favorites);
    }

    isAddressInFavorites(address){
        var favorites = this.state.favorites;
        for(var i = 0; i < favorites.length; i++){
            if(favorites[i].address === address){
                return true;
            }
        }
        return false;
    }

    searchForAddress(address){
        // var self = this;
        
        // use Google maps geocode functionality
        GMaps.geocode({
            address: address,
            callback: (results, status)=>{
                if(status !== 'OK'){return}
                var latlng = results[0].geometry.location;
                console.log(latlng);

                this.setState({
                    currentAddress: results[0].formatted_address,
                    mapCoordinates: {
                        lat: latlng.lat(),
                        lng: latlng.lng()
                    }
                });
            }
        });
    }

    render() {
        return (
            <div>
                <h1>Your Google Maps Locations</h1>

                <Search onSearch={this.searchForAddress} />

                <Map lat={this.state.mapCoordinates.lat} lng={this.state.mapCoordinates.lng} />

                <CurrentLocation address={this.state.currentAddress} 
                 favorite={this.isAddressInFavorites(this.state.currentAddress)}
                 onFavoriteToggle={this.toggleFavorite}
                />

                <LocationList locations={this.state.favorites} 
                 activeLocationAddress={this.state.currentAddress}
                />
            </div>
        )
    }

}

module.exports = App;