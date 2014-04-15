//
//  ParkNGoViewController.h
//  Park N Go
//
//  Created by Daniel Young on 2014-03-14.
//  Copyright (c) 2014 Park N Go. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <MapKit/MapKit.h>

@interface ParkNGoViewController : UIViewController <MKMapViewDelegate>

@property (nonatomic, retain) IBOutlet MKMapView *parkingMap;
@property (weak, nonatomic) IBOutlet UISearchBar *citySearch;

@end
