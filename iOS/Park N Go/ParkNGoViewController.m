//
//  ParkNGoViewController.m
//  Park N Go
//
//  Created by Daniel Young on 2014-03-14.
//  Copyright (c) 2014 Park N Go. All rights reserved.
//

#import "ParkNGoViewController.h"

@interface ParkNGoViewController ()
@end

@implementation ParkNGoViewController


- (void)viewDidLoad {
    [super viewDidLoad];
	// Do any additional setup after loading the view, typically from a nib.
    _parkingMap.delegate = self;
    
    UIBarButtonItem *backButton = [[UIBarButtonItem alloc] initWithTitle:@"Back" style:UIBarButtonItemStyleBordered target:nil action:nil];
    self.navigationItem.backBarButtonItem = backButton;
    
    [self.navigationController.navigationBar setTitleTextAttributes:@{NSForegroundColorAttributeName : [UIColor whiteColor]}];
    self.navigationController.navigationBar.tintColor = [UIColor whiteColor];
    self.navigationController.navigationBar.barTintColor = [UIColor colorWithRed:107.0/255.0 green:218.0/255.0 blue:141.0/255.0 alpha:1.0];

    [self centerMapOnUser];
    _parkingMap.showsUserLocation = YES;
}

- (void)centerMapOnUser {
    MKUserLocation *userLocation = _parkingMap.userLocation;
    MKCoordinateRegion region =
    MKCoordinateRegionMakeWithDistance (
                                        userLocation.location.coordinate, 1500, 1500);
    [_parkingMap setRegion:region animated:YES];
}

- (void)mapView:(MKMapView *)mapView didUpdateUserLocation:(MKUserLocation *)userLocation {
    _parkingMap.centerCoordinate =
    userLocation.location.coordinate;
}




@end
